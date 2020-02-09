<template>
    <section id="page-login">
        <div class="login-dialog">
            <div class="title">
                <h1>Login</h1>
            </div>
            <div
                class="register-icon"
                :class="{
                    'register-icon-active': status === 'register'
                }"
                @click="toggleLogin">
                <img src="@/assets/images/public/register.png" alt="注册按钮">
            </div>
            <div class="username">
                <el-input
                    v-model="user"
                    placeholder="请输入用户名">
                </el-input>
            </div>
            <div class="password">
                <el-input
                    v-model="pwd"
                    type="password"
                    placeholder="请输入密码">
                </el-input>
            </div>
            <div class="login-btn">
                btn
            </div>
            <div class="reset-pwd">
                forget password
            </div>

            <!-- 注册 -->
            <div
                v-show="status === 'register'"
                class="register-dialog">
                <div class="title">
                    <h1>Register</h1>
                </div>
                <div
                    class="login-icon"
                    @click="toggleLogin">
                    1234
                </div>
                <div class="username">
                    <el-input
                        v-model="user"
                        placeholder="请输入用户名">
                    </el-input>
                </div>
                <div class="password">
                    <el-input
                        v-model="pwd"
                        type="password"
                        placeholder="请输入密码">
                    </el-input>
                </div>
                <div class="repeat-password">
                    <el-input
                        v-model="repeatPwd"
                        type="password"
                        placeholder="请确认密码">
                    </el-input>
                </div>
                <div class="register-btn">
                    register-btn
                </div>
                <div class="has-account">
                    has-account
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Login extends Vue {
    // 用户名
    user: string = ''
    // 密码
    password: string = ''
    // 确认密码
    repeatPwd: string = ''
    // 当前状态
    status: string = 'login'

    /** @desc 跳转到注册 */
    toggleLogin () {
        this.status = this.status === 'register' ? 'login' : 'register'
    }
}
</script>

<style lang="scss" scoped>
    #page-login {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-dialog {
            width: 400px;
            height: 500px;
            background: white;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            position: relative;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border-radius: 5px;

            &::before {
                content: '';
                width: 96%;
                height: 10px;
                border-radius: 5px 5px 0 0;
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
                position: absolute;
                background: #fafafa;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
            }

            .title {
                color: #ed2553;
            }

            .register-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 30px;
                right: -50px;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                background: #ed2553;
                cursor: pointer;
                transition: all .5s;
                z-index: 1;

                &:hover {
                    background: #d4274f;
                }

                img {
                    width: 32%;
                    height: 32%;
                }
            }

            .register-icon-active {
                // top: 200px;
                // left: 150px;
                transform: translate(-200%, 150%);
            }

            .username {

                .test {
                    color: red;
                }
            }

            .el-input {
                width: 80%;
            }

            .register-dialog {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                position: absolute;
                width: 100%;
                height: 100%;
                background: #ed2553;
                border-radius: 5px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                top: 10px;
                left: -10px;

                .title {
                    color: white;
                }
            }
        }
    }
</style>
