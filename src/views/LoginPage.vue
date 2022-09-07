<template>
  <div id="wrap">
    <main id="main">
      <section id="login-container">
        <article class="container-bg">
          <div class="login-wrap">
            <div class="login-left">
              <p>데이터로 새로운 <br />미래를 펼치는</p>
              <div id="logotype">
                <img src="../assets/images/signup_login/logotype.svg" alt="" />
              </div>
            </div>
            <ul class="login-right">
              <li>
                <div id="logo">
                  <img src="../assets/images/signup_login/logo.svg" alt="" />
                </div>
              </li>
              <li>
                <div class="login-title">
                  <span></span>
                  <p>소셜 로그인</p>
                  <span></span>
                </div>
                <div class="social-login">
                  <button class="google">
                    <img
                      src="../assets/images/signup_login/google.svg"
                      alt=""
                    />
                  </button>
                  <button class="kakao">
                    <img src="../assets/images/signup_login/kakao.svg" alt="" />
                  </button>
                  <button class="naver">
                    <img src="../assets/images/signup_login/naver.svg" alt="" />
                  </button>
                </div>
              </li>
              <li>
                <div class="login-title">
                  <span></span>
                  <p>또는</p>
                  <span></span>
                </div>
                <div class="login-input-wrap">
                  <input type="text" id="login-id" required />
                  <label for="login-id">아이디</label>
                  <div class="warning">
                    <img
                      src="../assets/images/signup_login/icon-warning.svg"
                      alt=""
                    /><span> 아이디를 입력하세요.</span>
                  </div>
                </div>
                <div class="login-input-wrap">
                  <input type="password" id="login-pw" required />
                  <label for="login-pw">비밀번호</label>
                  <img
                    class="pw-view"
                    src="../assets/images/signup_login/icon-view1.svg"
                    alt=""
                  />
                  <!-- <img class="pw-view" src="../assets/images/signup_login/icon-view2.svg" alt=""> -->
                  <div class="warning">
                    <img
                      src="../assets/images/signup_login/icon-warning.svg"
                      alt=""
                    /><span> 비밀번호를 입력하세요.</span>
                  </div>
                  <!-- <div class="warning"><img src="../assets/images/signup_login/icon-warning.svg" alt=""><span> 비밀번호는 최소 8자 이상입니다.</span></div>
                                    <div class="warning"><img src="../assets/images/signup_login/icon-warning.svg" alt=""><span> 아이디를 입력하세요.</span></div> -->
                </div>
              </li>
              <li class="auto-input">
                <ul>
                  <li></li>
                  <li>
                    <button class="sound">
                      <img
                        src="../assets/images/signup_login/icon-auto-input1.svg"
                        alt=""
                      />
                      <span>음성듣기</span>
                    </button>
                    <button class="refresh">
                      <img
                        src="../assets/images/signup_login/icon-auto-input2.svg"
                        alt=""
                      />
                      <span>새로고침</span>
                    </button>
                  </li>
                </ul>
                <input type="text" placeholder="자동입력 방지" />
              </li>
              <li>
                <ul class="checkbox-wrap2">
                  <li>
                    <input type="checkbox" id="save-id" />
                    <label for="save-id">아이디 저장</label>
                  </li>
                  <li>
                    <input type="checkbox" id="maintain-login" />
                    <label for="maintain-login">로그인 상태 유지</label>
                  </li>
                </ul>
              </li>
              <li>
                <button class="login-btn">로그인</button>
                <button class="login-btn2" @click="login">로그인</button>
                <div class="login-option">
                  <a href="#">아이디 찾기</a>
                  <span></span>
                  <a href="#">아이디 비밀번호 찾기</a>
                  <span></span>
                  <a href="#">회원가입</a>
                </div>
              </li>
            </ul>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
export default {
  setup() {
    const id = ref('admin01');
    const password = ref('qwer1');
    const login = async () => {
      await axios.post('http://210.113.122.196:8825/rest/api/1/auth/login', {
        user_id: id.value,
        user_password: password.value,
      });
    };
    return {
      id,
      password,
      login,
    };
  },
};
</script>

<style scoped>
@import '../css/reset.css';
@import '../css/signup_login.css';
</style>
