from PIL import Image, ImageDraw, ImageFont, PSDraw
from pathlib import Path
import time
from buzzer import activate_buzzer

# 업로드된 이미지 저장 경로
UPLOAD_DIR = Path("uploads/")
UPLOAD_DIR.mkdir(exist_ok=True)

# 숫자에 대응하는 메시지를 설정하는 부분 (필요시 추가 가능)
def process_image(image_file: str, number: str):
    # 사용자로부터 입력받은 숫자를 찾음
    text = "1883"  # 없는 숫자는 입력받은 숫자로 처리

    # 웹캠 이미지를 Pillow로 열기
    img = Image.open(image_file)

    # 사진 1대1 비율로 자르기
    img = img.crop((0, 0, 720, 720))

    # 이미지의 현재 크기
    original_width, original_height = img.size

    # 이미지 크기 비율을 유지하면서 확대할 크기 설정 (예: 6배 확대)
    scale_factor = 1
    new_width = int(original_width * scale_factor)
    new_height = int(original_height * scale_factor)
    size = (new_width,new_height)

    # # 비율 유지하며 이미지 크기 조정
    img = img.resize((new_width, new_height))

    # # 배경 디자인 이미지 열기 (PNG 파일이 투명도를 지원함)
    background = Image.open("./uploads/frame.png") # JPG는 투명도 없음, RGB로 변환
    img_size = background.size

    # # 웹캠 이미지를 배경 디자인 위에 합성
    background.paste(img, (159, 213))  # 특정 위치에 웹캠 이미지 붙여넣기

   
    # # 텍스트 추가 (숫자 삽입, 커스텀 폰트 사용)
    draw = ImageDraw.Draw(background)
    font = ImageFont.truetype("./uploads/DepartureMono-Regular.otf", 100)  # Departure Mono 폰트 사용

    bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    position = ((img_size[0] - text_width) // 2, 1078)

    # # 텍스트 추가 (세로 위치는 고정)
    draw.text(position, text,align="center", font=font, fill=(0, 0, 0))  # 원하는 위치에 텍스트 삽입

     #ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ날짜 합성ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 2.38베
    text_date = "2024.11.02"
    font_date = ImageFont.truetype("./uploads/Galmuri14.ttf", 45)

    # 텍스트 크기 계산
    bbox = draw.textbbox((0, 0), text_date, font=font_date)

    date_width, date_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    position_date = (596, 862)

    draw.text(position_date, text_date, align="center", font=font_date, fill=(255,255,255))

    #ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ메시지 합성ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    text_date = "안녕안녕"
    font_date = ImageFont.truetype("./uploads/DungGeunMo.ttf", 73)

    # 텍스트 크기 계산
    bbox = draw.textbbox((0, 0), text_date, font=font_date)

    date_width, date_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    position_date = ((img_size[0] - date_width) // 2, 1257)

    draw.text(position_date, text_date, align="center", font=font_date, fill=(0,0,0))



    # # 결과 이미지를 저장 (JPG 형식)
    output_path = UPLOAD_DIR / "output.png"
    background.save(output_path, "png")  # JPG로 저장

    print(f"Image processed successfully. Output saved at: {output_path}")
    activate_buzzer()

# 테스트할 이미지 파일 경로와 숫자 입력
test_image_file = 'uploads/webcam.png'  # 웹캠으로 찍은 이미지 파일
test_number = "12323"  # 사용자 입력 숫자

# 이미지 처리 함수 호출
start = time.time()
process_image(test_image_file, test_number)
end=time.time()
print(end-start)