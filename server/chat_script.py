import socket
import json

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('159.89.16.15', 65432))

# Send chat command
s.sendall(json.dumps({"command": "chat", "message": "Hello, can you show me some content?"}).encode())

buffer = b""
in_streaming_response = False
response_count = 0

while True:
    data = s.recv(1024)
    if not data:
        break
    buffer += data

    while buffer:
        try:
            # Find the end of a JSON object using brace counting
            brace_count = 0
            json_end = -1
            for i, byte in enumerate(buffer):
                if byte == ord(b'{'):
                    brace_count += 1
                elif byte == ord(b'}'):
                    brace_count -= 1
                    if brace_count == 0:
                        json_end = i + 1
                        break
            if json_end > 0:
                json_data = buffer[:json_end]
                buffer = buffer[json_end:]
                response = json.loads(json_data.decode())

                if response.get("status") == "end":
                    print("\n[END] All responses received.")
                    s.close()
                    exit(0)
                elif response.get("status") == "streaming":
                    if not in_streaming_response:
                        response_count += 1
                        in_streaming_response = True
                        print(f"\n[Response #{response_count} (STREAMING)]: ", end="", flush=True)
                    print(response.get("content", ""), end="", flush=True)
                    if not response.get("partial", True):
                        in_streaming_response = False
                        print()  # Newline after streaming
                else:
                    response_count += 1
                    print(f"\n[Response #{response_count} ({response.get('type', 'unknown').upper()})]: {response}")
            else:
                break
        except json.JSONDecodeError:
            break