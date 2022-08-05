Kakao.init('75151c20cdc2afe112513ee9241e8de8'); //jS key : seomun-app01
Kakao.isInitialized();

/* 첫 화면에서 로그아웃 버튼 안보이게 설정해두기 */
document.getElementById('logout').style.display = 'none';

function kakaoLogin(){
    Kakao.Auth.login({
        success: function(response){
            Kakao.API.request({
                url : '/v2/user/me',
                success : function(response){
                    console.log(response);
                    /* 로그인 성공하면 user의 profile 중 nickname을 불러와서 넣어주기 */
                    document.getElementById('user').style.display = 'block';
                    document.getElementById('user').innerText = response.kakao_account.profile.nickname + "님";
                    document.getElementById('login').style.display = 'none';
                    document.getElementById('logout').style.display = 'block';
                    alert(response.kakao_account.profile.nickname + '님 안녕하세요!');
                }
            })
        }
    })
}

/* kakao developers > 도구 > JS SDK 데모 > 카카오 로그인 > 로그아웃 참고함! */
function kakaoLogout(){
    if (!Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url : '/v2/user/unlink',
            success : function(response){
                console.log(response);
                /* 로그인 성공하면 user의 profile 중 nickname을 불러와서 넣어주기 */
                document.getElementById('user').style.display = 'none';
                document.getElementById('login').style.display = 'block';
                document.getElementById('logout').style.display = 'none';
                alert('로그아웃 되었습니다.');
            }
        })
        Kakao.Auth.setAccessToken(undefined);
    }

    
    Kakao.Auth.logout(function() {
      alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken())
    })
}