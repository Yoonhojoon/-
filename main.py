from PIL import Image, ImageDraw, ImageFont, PSDraw
from pathlib import Path

# 업로드된 이미지 저장 경로
UPLOAD_DIR = Path("uploads/")
UPLOAD_DIR.mkdir(exist_ok=True)

# 숫자에 대응하는 메시지를 설정하는 부분 (필요시 추가 가능)
def process_image(image_file: str, number: str):
    # 사용자로부터 입력받은 숫자를 찾음
    text = "12526123"  # 없는 숫자는 입력받은 숫자로 처리

    # 웹캠 이미지를 Pillow로 열기
    img = Image.open(image_file)

    # 사진 1대1 비율로 자르기
    img = img.crop((0, 0, 480, 480))

    # 이미지의 현재 크기
    original_width, original_height = img.size

    # 이미지 크기 비율을 유지하면서 확대할 크기 설정 (예: 6배 확대)
    scale_factor = 6
    new_width = int(original_width * scale_factor)
    new_height = int(original_height * scale_factor)
    size = (new_width,new_height)

    # # 비율 유지하며 이미지 크기 조정
    img = img.resize((new_width, new_height))

    # # 배경 디자인 이미지 열기 (PNG 파일이 투명도를 지원함)
    background = Image.open("./uploads/frame.png") # JPG는 투명도 없음, RGB로 변환
    img_size = background.size

    # # 웹캠 이미지를 배경 디자인 위에 합성
    background.paste(img, (620, 527))  # 특정 위치에 웹캠 이미지 붙여넣기

   
    # # 텍스트 추가 (숫자 삽입, 커스텀 폰트 사용)
    draw = ImageDraw.Draw(background)
    font = ImageFont.truetype("./uploads/DepartureMono-Regular.otf", 400)  # Departure Mono 폰트 사용

    bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    position = ((img_size[0] - text_width) // 2, 3852)

    # # 텍스트 추가 (세로 위치는 고정)
    draw.text(position, text,align="center", font=font, fill=(0, 0, 0))  # 원하는 위치에 텍스트 삽입

    # # 결과 이미지를 저장 (JPG 형식)
    output_path = UPLOAD_DIR / "output.png"
    background.save(output_path, "png")  # JPG로 저장

    print(f"Image processed successfully. Output saved at: {output_path}")

# 테스트할 이미지 파일 경로와 숫자 입력
test_image_file = 'uploads/webcam.png'  # 웹캠으로 찍은 이미지 파일
test_number = "12323"  # 사용자 입력 숫자

# 이미지 처리 함수 호출
process_image(test_image_file, test_number)