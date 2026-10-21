# ⚡ P2P Share — Ultra P2P Messenger & Direct File Share

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-4f46e5?style=for-the-badge&logo=github)](https://your-username.github.io/p2p-share/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-10b981?style=for-the-badge&logo=pwa)](#progressive-web-app-pwa-installation)
[![Zero Cloud](https://img.shields.io/badge/Storage-100%25_Client_Device-ec4899?style=for-the-badge&logo=databricks)](#quad-transport-hybrid-architecture)
[![Version](https://img.shields.io/badge/Version-v8.0-06b6d4?style=for-the-badge)](#)
[![Author](https://img.shields.io/badge/Designed_%26_Developed_by-Md._Kaif-312e81?style=for-the-badge)](#developer--architect)

**P2P Share** is a zero-server, peer-to-peer (P2P) messenger and high-speed file streaming web application engineered to run entirely on **GitHub Pages** or any static hosting environment. It connects desktops, phones, and tablets directly over local Wi-Fi (LAN) and the Internet (WAN) with zero cloud storage, no backend databases, and no file size limits.

---

## ✨ Key Features

| Category | Capabilities |
| :--- | :--- |
| **🔗 3-Way Instant Pairing** | Connect devices via **Direct Invite Links**, **HD Autofocus QR Code Scanner** (with optical zoom, torch, and macro refocus), or a persistent **5-Digit PIN**. |
| **⚡ Turbo LAN & WAN File Streaming** | Streams files of any size using **64KB Turbo LAN chunks** over WebRTC DataChannels and **16KB SCTP-safe chunks** over multi-broker WSS relays. |
| **🛡️ SHA-256 Integrity & Auto-Retry** | Every transferred file is verified via **SHA-256 checksums**. Includes a **Network-Switch Guard** that halts transfers safely if Wi-Fi drops and enables **1-Tap Retry**. |
| **💬 Real-Time P2P Messenger** | End-to-end direct chat with typing indicators, read receipts (`✓✓`), message replies, quick emojis, and **live in-chat file progress bars**. |
| **⏳ Auto-Expiring File Transfers** | Set custom download expiration timers (**5 Mins, 15 Mins, 1 Hour, 24 Hours, or Never**). Expired files automatically lock and revoke local blob URLs. |
| **🔒 Privacy & Stealth Cloak** | **1-Tap Permission Handshake** before chatting, instant **Permission Revocation** (locks channel), and **Mutual Stealth Blocking** (hides your online presence from blocked peers). |
| **📱 Installable Offline PWA** | Built-in Web App Manifest and Service Worker (`sw.js`) for standalone installation on Android, iOS, Windows, macOS, and Linux. |
| **🎨 120fps Glassmorphic UI** | Hardware-accelerated spring animations, dual drag-and-drop zones, collapsible header toolbars, Web Audio API chimes, and instant **Light / Dark Mode**. |

---

## 🧠 Quad-Transport Hybrid Architecture

P2P Share eliminates server-side dependencies (`database.json` and backend upload folders) by combining four real-time browser transport layers with a local **IndexedDB Device Vault (`AtaDirectLanVault_v5`)**:

1. **WebRTC DataChannels (PeerJS + STUN/TURN):** Primary high-speed binary pipeline for direct device-to-device LAN and WAN streaming with event-driven backpressure control (`bufferedAmountLowThreshold`).
2. **Local BroadcastChannel Bus:** Zero-latency, zero-encoding binary transfer between tabs/windows on the same device.
3. **Dual-Broker MQTT over WSS (`HiveMQ` + `EMQX`):** Redundant WebSocket Secure brokers for instant multi-device lobby discovery, PIN lookups, and automatic firewall/AP-isolation failover.
4. **Serverless Pusher Channels (`ap2` Cluster):** Real-time signaling and interactive toast alerts signed directly in the browser using the native **Web Crypto API (HMAC-SHA256)**.

---

## 🚀 How to Use (3 Ways to Connect)

### Method 1: Share Your Direct Invite Link
1. Open **P2P Share** and click **My Link** in the navigation bar.
2. Click **Copy** (or the native OS **Share** icon) to send your unique `?connect=...` invite URL via WhatsApp, Telegram, or Email.
3. When your peer opens the link and enters their name, click **Accept** on the real-time notification toast to unlock chat and file sharing.

### Method 2: Scan Peer QR Code (Phone ⇄ PC)
1. On **Device A**, click **My Link** to display your high-contrast QR Code.
2. On **Device B**, tap the center **Scan** button to launch the **HD Autofocus QR Scanner**.
3. Point the camera at the QR code (use the built-in **Refocus**, **Torch**, or **Zoom Slider** if needed) to send an instant join request.

### Method 3: Enter a 5-Digit PIN
1. Note your peer's persistent **5-Digit PIN** displayed at the top of their app or inside their **My Link** modal.
2. Open **My Link**, enter their 5-digit PIN into the pairing input box, and click **Send Req**.
3. Once approved, drop files into the **Chat** window or the dedicated **Files** tab to begin streaming.

---

## 📂 Repository Structure

```text
p2p-share/
├── index.html      # Complete single-file application (UI, Visual Guide & P2P Engine)
├── sw.js           # Service Worker for offline app-shell caching (GitHub Pages compatible)
├── manifest.json   # Optional standalone PWA Web App Manifest
└── README.md       # Project documentation
```

---

## 🌐 Deploying on GitHub Pages

1. **Fork or Clone** this repository to your GitHub account:
   ```bash
   git clone [https://github.com/your-username/p2p-share.git](https://github.com/your-username/p2p-share.git)
   ```
2. Ensure `index.html` and `sw.js` (and optionally `manifest.json`) are in the root directory.
3. Go to your repository on GitHub and click **Settings** → **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select your branch (`main` or `master`) and folder (`/ (root)`), then click **Save**.
6. Your live P2P hub will be published at `https://your-username.github.io/p2p-share/` within 60 seconds.

---

## 📲 Progressive Web App (PWA) Installation

* **Android / Desktop (Chrome, Edge, Brave):** Click the **Install App (PWA)** button inside the app or select **Install P2P Share** from your browser's address bar / menu (`⋮`). Once installed, all install buttons automatically hide.
* **iOS / iPadOS (Safari):** Tap the **Share** button in Safari, scroll down, and tap **Add to Home Screen**.

---

## 👨‍💻 Developer & Architect

**Designed & Developed by Md. Kaif**  
*Full-Stack Web, Desktop & Mobile Application Developer*  
Specializing in real-time WebRTC communication tools, cloud infrastructure, PHP/Laravel ecosystems, Chrome extensions, and modern cross-platform web applications.

---

## 📄 License

This project is released under the [MIT License](LICENSE).
