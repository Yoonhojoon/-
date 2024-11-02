from fastapi import FastAPI, UploadFile, File, Form
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import base64
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import subprocess

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
def process_image(image_file: BytesIO, number: str):
    # 사용자로부터 입력받은 숫자를 처리
    text = number  # 사용자가 입력한 숫자를 텍스트로 사용

    # 웹캠 이미지를 Pillow로 열기
    img = Image.open(image_file)

    # 사진 1대1 비율로 자르기
    img = img.crop((0, 0, 480, 480))

    # 이미지의 현재 크기
    original_width, original_height = img.size

    # 이미지 크기 비율을 유지하면서 확대할 크기 설정 (예: 1.52배 확대)
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

    # 결과 이미지를 임시 파일로 저장
    output_path = UPLOAD_DIR / "output.jpg"
    background.save(output_path, "JPEG")

    # 저장된 파일을 인쇄 명령어로 전송
    try:
        subprocess.run(["lp", "-d", "srp", str(output_path)], check=True)
        print("Printing command sent successfully.")
    except subprocess.CalledProcessError as e:
        print("An error occurred while printing:", e)

    # 이미지를 base64로 인코딩하기 위해 메모리 버퍼에 저장
    output_buffer = BytesIO()
    background.save(output_buffer, format="JPEG")
    output_buffer.seek(0)

    # 이미지를 base64로 인코딩
    encoded_image = base64.b64encode(output_buffer.getvalue()).decode('utf-8')

    return encoded_image

class PostInput(BaseModel):
    file: str  # base64로 인코딩된 이미지 데이터
    number: str

# FastAPI 라우팅 부분
@app.post("/process-image/")
async def process_image_api(input: PostInput):
    # base64로 인코딩된 이미지 디코딩
    image_data = base64.b64decode(input.file)
    number = input.number

    # 이미지 데이터로부터 BytesIO 객체 생성
    image_file = BytesIO(image_data)

    # 이미지 처리 함수 호출
    start_time = time.time()
    processed_image_base64 = process_image(image_file, number)
    end_time = time.time()

    return {
        "message": "Image processed successfully.",
        "output_image": processed_image_base64,  # base64 인코딩된 이미지
        "processing_time": end_time - start_time
    }

@app.get("/")
def root():
    return {"message": "HELLOW"}