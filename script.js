// particlesJS
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 50
        },
        "size": {
            "value": 3
        },
        "move": {
            "enable": true,
            "speed": 2
        },
        "line_linked": {
            "enable": true,
            "opacity": 0.5
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            }
        }
    }
});

// ديسكورد تسجيل الدخول (اختصار, مثال)
const clientId = '1365741528378773626';
const redirectUri = window.location.origin + '/';
const webhookURL = 'YOUR_WEBHOOK_URL'; // ضع رابط الويبهوك هنا

function getUserInfo() {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    const accessToken = params.get('access_token');
    if (accessToken) {
        fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        })
        .then(result => result.json())
        .then(response => {
            document.getElementById('user-info').innerHTML = 
                `<img src="https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png" width="50" style="border-radius:50%;"> <br> 
                مرحباً، ${response.username}`;
        })
        .catch(console.error);
    }
}

if (window.location.hash.includes('access_token')) {
    getUserInfo();
} else {
    // تسجيل الدخول بالديسكورد
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=identify`;
}

// فتح نموذج البلاغ
document.getElementById('reportBtn').onclick = function() {
    document.getElementById('reportForm').style.display = 'block';
    document.getElementById('reportBtn').style.display = 'none';
};

// ارسال البلاغ
document.getElementById('form').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const site = document.getElementById('site').value;
    const file = document.getElementById('image').files[0];

    if (!file) return alert('ارفق صورة');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('payload_json', JSON.stringify({
        content: `بلاغ جديد:
الاسم: ${name}
الموقع: ${site}`
    }));

    await axios.post(webhookURL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    alert('تم ارسال البلاغ بنجاح');
    location.reload();
};
