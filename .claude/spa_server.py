import http.server,socketserver,os
os.chdir("/Users/emre.yalciner/Desktop/tcfsystem")
PORT=int(os.environ.get("PORT","8055"))
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self): self.send_header("Cache-Control","no-store");super().end_headers()
    def do_GET(self):
        p=self.path.split("?")[0]
        if not os.path.exists(self.translate_path(self.path)) and "." not in os.path.basename(p):
            # vercel.json ile ayni sira: once /trambolin/* alt-SPA, sonra ana SPA
            self.path="/trambolin/index.html" if p.startswith("/trambolin/") else "/index.html"
        return super().do_GET()
socketserver.TCPServer.allow_reuse_address=True
with socketserver.TCPServer(("",PORT),H) as s: print("SPA on",PORT); s.serve_forever()
