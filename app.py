from fastapi import FastAPI, UploadFile, File, Form
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
from pathlib import Path
import base64
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import subprocess
from buzzer import activate_buzzer



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 업로드된 이미지 저장 경로
UPLOAD_DIR = Path("uploads/")
UPLOAD_DIR.mkdir(exist_ok=True)

# 이미지 처리 함수
def process_image(image_file: BytesIO, number: str, message: str):
    # 사용자로부터 입력받은 숫자를 처리
    text = number  # 사용자가 입력한 숫자를 텍스트로 사용

    # 웹캠 이미지를 Pillow로 열기
    img = Image.open(image_file)
    
    # 사진 1대1 비율로 가운데에서 자르기
    imgWidth, imgHeight = img.size
    min_dimension = min(imgWidth, imgHeight)
    left = (imgWidth - min_dimension) // 2
    top = (imgHeight - min_dimension) // 2
    right = left + min_dimension
    bottom = top + min_dimension
    img_cropped = img.crop((left, top, right, bottom))  # 잘린 이미지

    # 이미지의 현재 크기
    original_width, original_height = img_cropped.size

    # 이미지 크기 비율을 유지하면서 확대할 크기 설정 (예: 0.78배 축소)
    scale_factor = 0.78
    new_width = int(original_width * scale_factor)
    new_height = int(original_height * scale_factor)

    # 비율 유지하며 이미지 크기 조정
    img_resized = img_cropped.resize((new_width, new_height))

    # 밝기 및 대비 조정
    brightness_enhancer = ImageEnhance.Brightness(img_resized)
    img_bright_contrast = brightness_enhancer.enhance(1.2)  # 밝기를 20% 증가
    contrast_enhancer = ImageEnhance.Contrast(img_bright_contrast)
    img_processed = contrast_enhancer.enhance(2)  # 대비를 100% 증가

    # 배경 디자인 이미지 열기 (PNG 파일이 투명도를 지원함)
    background = Image.open("./uploads/frame.png").convert('RGB')  # 배경 이미지

    # 수정된 이미지를 배경 디자인 위에 합성
    background_with_processing = background.copy()
    background_with_processing.paste(img_processed, (159, 213))  # 웹캠 이미지 붙여넣기

    # 텍스트 추가 (숫자 삽입, 커스텀 폰트 사용)
    draw = ImageDraw.Draw(background_with_processing)
    font = ImageFont.truetype("./uploads/DepartureMono-Regular.otf", 94)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    position = ((background_with_processing.size[0] - text_width) // 2, 1078)
    draw.text(position, text, align="center", font=font, fill=(0, 0, 0))

    # 메시지 텍스트 추가
    message_font = ImageFont.truetype("./uploads/DungGeunMo.ttf", 73)
    lines = message.split('\n')
    y_position = 1257
    line_spacing = 50

    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=message_font)
        line_width = bbox[2] - bbox[0]
        line_position = ((background_with_processing.size[0] - line_width) // 2, y_position)
        draw.text(line_position, line, align="center", font=message_font, fill=(0, 0, 0))
        y_position += bbox[3] - bbox[1] + line_spacing

    # 날짜 텍스트 추가
    text_date = "2024.11.03"
    font_date = ImageFont.truetype("./uploads/Galmuri14.ttf", 47)
    bbox = draw.textbbox((0, 0), text_date, font=font_date)
    position_date = (596, 862)
    draw.text(position_date, text_date, align="center", font=font_date, fill=(255, 255, 255))

    # 최종 이미지 저장 (처리된 이미지)
    output_path = UPLOAD_DIR / "output.png"
    background_with_processing.save(output_path, "PNG")

    # 수정되지 않은 이미지 합성
    background_without_processing = background.copy()
    background_without_processing.paste(img_resized, (159, 213))  # 수정되지 않은 웹캠 이미지 붙여넣기

    # 텍스트 추가 (숫자 삽입, 커스텀 폰트 사용)
    draw_without_processing = ImageDraw.Draw(background_without_processing)
    draw_without_processing.text(position, text, align="center", font=font, fill=(0, 0, 0))

    # 메시지 텍스트 추가
    y_position = 1257
    for line in lines:
        bbox = draw_without_processing.textbbox((0, 0), line, font=message_font)
        line_width = bbox[2] - bbox[0]
        line_position = ((background_without_processing.size[0] - line_width) // 2, y_position)
        draw_without_processing.text(line_position, line, align="center", font=message_font, fill=(0, 0, 0))
        y_position += bbox[3] - bbox[1] + line_spacing

    # 날짜 텍스트 추가
    draw_without_processing.text(position_date, text_date, align="center", font=font_date, fill=(255, 255, 255))

    # 최종 이미지 저장 (수정되지 않은 이미지)
    output_contrast_path = UPLOAD_DIR / "output_contrast.png"
    background_without_processing.save(output_contrast_path, "PNG")

    # 이미지를 base64로 인코딩하기 위해 메모리 버퍼에 저장
    output_buffer = BytesIO()
    background_without_processing.save(output_buffer, format="PNG")
    output_buffer.seek(0)

    # 이미지를 base64로 인코딩
    encoded_image = base64.b64encode(output_buffer.getvalue()).decode('utf-8')

    return encoded_image, str(output_contrast_path)

class PostInput(BaseModel):
    file: str  # base64로 인코딩된 이미지 데이터
    number: str
    interpretedMessage: str  # 새로 추가된 필드

    
# FastAPI 라우팅 부분
@app.post("/process-image/")
async def process_image_api(input: PostInput):
    # base64로 인코딩된 이미지 디코딩
    image_data = base64.b64decode(input.file)
    number = input.number
    interpreted_message = input.interpretedMessage  # 해석 메시지

    # 이미지 데이터로부터 BytesIO 객체 생성
    image_file = BytesIO(image_data)

    # 이미지 처리 함수 호출
    start_time = time.time()
    processed_image_base64, image_path = process_image(image_file, number, interpreted_message)
    end_time = time.time()

    return {
        "message": "Image processed successfully.",
        "output_image": processed_image_base64,  # base64 인코딩된 이미지
        "interpreted_message": interpreted_message,  # 응답에 해석 메시지 포함  
        "processing_time": end_time - start_time
    }

class hih(BaseModel):
    hi: str

# 인쇄만 처리하는 라우트 추가
@app.post("/print-image/")
async def print_image(image_path: hih):
    # 저장된 파일을 인쇄 명령어로 전송
    try:
        activate_buzzer()
        time.sleep(1.3)

        subprocess.run(["lp -d  BIXOLON-SRP-330II -o PageSize=81X80MMY80M -o PageLeft=38 -o PageRight=38 ./uploads/output.png" ], shell=True)
        print("Printing command sent successfully.")
        
    except subprocess.CalledProcessError as e:
        print("An error occurred while printing:", e)
        
     

@app.get("/")
def root():
    ex = Image.open("./uploads/example.png").convert('RGB')  # Load the image

    # 이미지 크기 조정 (80mm 폭, 약 640 픽셀에 맞게)
    scale_width = 640
    ex_width, ex_height = ex.size
    scale_factor = scale_width / ex_width
    new_height = int(ex_height * scale_factor)
    resized_ex = ex.resize((scale_width, new_height))  # Resize to fit width


    # 저장 경로
    ex_path = UPLOAD_DIR / "centered_output.png"
    resized_ex.save(ex_path, "png")

    try:
        # 정확한 이미지 파일 경로로 인쇄 명령 전송
        subprocess.run(["lp", "-d", "BIXOLON_SRP-330II", "-o", "PageSize=85X80MMY120MM", "./uploads/centered_output.png"], check=True)
        print("Printing command sent successfully.")
        activate_buzzer()
    except subprocess.CalledProcessError as e:
        print("An error occurred while printing:", e)

    return {"message": "Image resized and printed centered on 80mm paper"}
