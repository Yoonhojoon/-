from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import shutil

app = FastAPI()

# 업로드된 이미지 저장 경로
UPLOAD_DIR = Path("uploads/")
UPLOAD_DIR.mkdir(exist_ok=True)


# 숫자에 대응하는 메시지를 설정하는 부분 (필요시 추가 가능)
@app.post("/process-image/")
async def process_image(file: UploadFile = File(...), number: str = Form(...)):
    # 사용자로부터 받은 웹캠 사진 저장
    image_path = UPLOAD_DIR / file.filename
    with image_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 사용자로부터 입력받은 숫자 사용
    text = number

    # 웹캠 이미지를 Pillow로 열기
    img = Image.open(image_path)

    # 사진을 1대1 비율로 자르기
    img = img.crop((0, 0, 480, 480))

    # 이미지의 현재 크기
    original_width, original_height = img.size

    # 이미지 크기 비율을 유지하면서 확대할 크기 설정 (예: 6배 확대)
    scale_factor = 6
    new_width = int(original_width * scale_factor)
    new_height = int(original_height * scale_factor)

    # 비율 유지하며 이미지 크기 조정
    img = img.resize((new_width, new_height), Image.ANTIALIAS)

    # 배경 디자인 이미지 열기 (PNG 파일이 투명도를 지원함)
    background = Image.open("./uploads/frame.png")

    # 웹캠 이미지를 배경 디자인 위에 합성
    background.paste(img, (620, 527))  # 특정 위치에 웹캠 이미지 붙여넣기

    # 텍스트 추가 (숫자 삽입, 커스텀 폰트 사용)
    draw = ImageDraw.Draw(background)
    font = ImageFont.truetype("./uploads/DepartureMono-Regular.otf", 400)  # Departure Mono 폰트 사용

    # 텍스트 크기 계산
    text_width, text_height = draw.textsize(text, font=font)

    # 배경 이미지 크기
    bg_width, bg_height = background.size

    # 텍스트의 위치 계산 (가로 중앙)
    text_x = (bg_width - text_width) // 2

    # 원하는 위치에 텍스트 삽입 (세로는 고정된 값)
    draw.text((text_x, 3852), text, font=font, fill=(0, 0, 0))

    # 결과 이미지를 저장
    output_path = UPLOAD_DIR / "output.png"
    background.save(output_path)

    return JSONResponse(content={"message": "Image processed successfully", "output_image": str(output_path)})


@app.get("/")
async def read_index():
    return {"message": "FastAPI Image Processing API"}