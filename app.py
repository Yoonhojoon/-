from fastapi import FastAPI, UploadFile, File, Form
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import shutil
import time
import base64

app = FastAPI()

# 업로드된 이미지 저장 경로
UPLOAD_DIR = Path("uploads/")
UPLOAD_DIR.mkdir(exist_ok=True)

# 이미지 처리 함수
def process_image(image_file: str, number: str):
    # 사용자로부터 입력받은 숫자를 처리
    text = number  # 사용자가 입력한 숫자를 텍스트로 사용

    # 웹캠 이미지를 Pillow로 열기
    img = Image.open(image_file)

    # 사진 1대1 비율로 자르기
    img = img.crop((0, 0, 480, 480))

    # 이미지의 현재 크기
    original_width, original_height = img.size

    # 이미지 크기 비율을 유지하면서 확대할 크기 설정 (예: 6배 확대)
    scale_factor = 1.52
    new_width = int(original_width * scale_factor)
    new_height = int(original_height * scale_factor)
    size = (new_width, new_height)

    # 비율 유지하며 이미지 크기 조정
    img = img.resize((new_width, new_height))

    # 배경 디자인 이미지 열기 (PNG 파일이 투명도를 지원함)
    background = Image.open("./uploads/frame.png").convert('RGB')  # 배경 이미지

    # 웹캠 이미지를 배경 디자인 위에 합성
    background.paste(img, (155, 146))  # 특정 위치에 웹캠 이미지 붙여넣기

    # 텍스트 추가 (숫자 삽입, 커스텀 폰트 사용)
    draw = ImageDraw.Draw(background)
    font = ImageFont.truetype("./uploads/DepartureMono-Regular.otf", 94)  # Departure Mono 폰트

    # 텍스트 크기 계산
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    position = ((background.size[0] - text_width) // 2, 940)

    # 텍스트 추가 (세로 위치는 고정)
    draw.text(position, text, align="center", font=font, fill=(0, 0, 0))  # 텍스트 삽입

    # 날짜 텍스트 추가
    text_date = "2024.11.02"
    font_date = ImageFont.truetype("./uploads/Galmuri14.ttf", 47)

    # 날짜 텍스트 크기 계산
    bbox = draw.textbbox((0, 0), text_date, font=font_date)
    date_width, date_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    position_date = ((background.size[0] - date_width) // 2, 1227)

    # 날짜 텍스트 추가
    draw.text(position_date, text_date, align="center", font=font_date, fill=(0, 0, 0))

    # 결과 이미지를 저장 (PNG 형식)
    output_path = UPLOAD_DIR / "output.jpg"
    background.save(output_path, "jpeg")  # PNG로 저장

    # 이미지를 Base64로 인코딩하여 React로 전달할 수 있게 변환
    with open(output_path, "rb") as img_file:
        encoded_string = base64.b64encode(img_file.read()).decode('utf-8')

    return encoded_string  # Base64 인코딩된 이미지 데이터 반환



# FastAPI 라우팅 부분
@app.post("/process-image/")
async def process_image_api(file: UploadFile = File(...), number: str = Form(...)):
    # 사용자로부터 받은 웹캠 사진 저장
    image_path = UPLOAD_DIR / file.filename
    with image_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 이미지 처리 함수 호출
    start_time = time.time()
    encoded_image = process_image(image_path, number)
    end_time = time.time()

    return {
        "message": "Image processed successfully.",
        "output_image": encoded_image,  # Base64 인코딩된 이미지 데이터
        "processing_time": end_time - start_time
    }

@app.get("/")
#async def root():
def root():
    return {"message": "HELLOW"}
