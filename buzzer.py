import serial
import time

def activate_buzzer():
    try:
        # 'COM3'를 사용 중인 포트로 변경하세요. 예: Linux에서는 '/dev/ttyUSB0'
        with serial.Serial('/dev/cu.usbmodem14101', 9600, timeout=1) as ser:
            time.sleep(2)  # 직렬 연결이 설정될 시간을 기다림
            ser.write(b'1')  # 부저를 울리기 위한 신호 전송
            print("부저가 울렸습니다.")
    except serial.SerialException as e:
        print(f"아두이노 연결 오류: {e}")

if __name__ == "__main__":
    activate_buzzer()
