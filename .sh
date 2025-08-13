#!/bin/bash
echo "🔄 Đang khôi phục cấu hình terminal mặc định..."

# Backup .bashrc cũ
if [ -f ~/.bashrc ]; then
    mv ~/.bashrc ~/.bashrc.bak
    echo "📦 Đã backup ~/.bashrc thành ~/.bashrc.bak"
fi

# Copy file mặc định từ /etc/skel
cp /etc/skel/.bashrc ~/
echo "✅ Đã khôi phục ~/.bashrc mặc định"

# Đặt lại PATH cơ bản
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
echo "✅ Đã đặt lại PATH"

# Cài lại gnome-terminal nếu bị hỏng
sudo apt update
sudo apt install --reinstall -y gnome-terminal

echo "🎉 Hoàn tất! Hãy thử mở lại terminal."
