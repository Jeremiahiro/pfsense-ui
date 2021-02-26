<template>
  <div class="container col-md-8 mx-auto p-5">
    <b-row>
      <b-col class="text-center mt-3">
        <b-img src="~/assets/logo.png" width="180px" height="60px" alt="Image"></b-img>
      </b-col>
    </b-row>
    <div>
      <div class="my-4">
        <NavBar />
      </div>
     <div class="m-3">
            <b-row class="my-3">
            <h2 class="f-30 font-weight-bold">Hello Guest!</h2>
          </b-row>
          <b-row class="my-2">
            <p class="f-20 font-weight-regular">
              We are delighted you chose PFsense bank. Let's start by creating your account login
            </p>
          </b-row>
          </div>
          <div class="w-100">
            <b-form @submit="registerUser">
              <b-row class="my-2">
                <b-col md="6">
                  <b-form-group aria-describedby="username-feedback">
                    <b-form-input
                      id="username"
                      v-model="$v.form.username.$model"
                      :state="validateState($v.form.username)"
                      type="text"
                      placeholder="Username"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="email-feedback">
                      <ul class="m-0 pl-3">
                        <li v-if="!$v.form.username.required" class="py-1">
                          Username is required
                        </li>
                        <li v-if="!$v.form.username.minLength" class="py-1">
                          Username must be at lease 
                          {{ $v.form.username.$params.minLength.min }} characters long
                        </li>
                        <li v-if="!$v.form.username.alpha" class="py-1">
                          Accepts only alphanumerics.
                        </li>
                      </ul>
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                 <b-form-group aria-describedby="email-feedback">
                    <b-form-input
                      id="email"
                      v-model="$v.form.email.$model"
                      :state="validateState($v.form.email)"
                      type="email"
                      placeholder="Email Address"
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="email-feedback">
                      <ul class="m-0 pl-3">
                        <li v-if="!$v.form.email.required" class="py-1">
                          Email is required
                        </li>
                        <li v-if="!$v.form.email.email" class="py-1">
                          Email address is not properly formatted
                        </li>
                      </ul>
                    </b-form-invalid-feedback>
                </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="md-12">
                  <b-form-group class="" aria-describedby="password-feedback">
                      <b-form-input
                        id="password"
                        v-model="$v.form.password.$model"
                        :state="validateState($v.form.password)"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="*********"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback id="password-feedback">
                        <ul class="m-0 pl-3">
                          <li
                            v-if="!$v.form.password.isPasswordStrong"
                            class="py-1"
                          >
                            Minimum eight characters, at least one uppercase
                            letter, one lowercase letter and one number
                          </li>
                        </ul>
                      </b-form-invalid-feedback>
                        <div
                            class="d-none d-lg-block icon-eye"
                            :class="{ showPassword: showPassword }"
                            viewBox="0 0 20 20"
                            width="20"
                            height="20"
                            fill="inherit"
                            @click="showPassword = !showPassword"
                          >
                          <span v-if="showPassword">hide</span>
                          <span v-else>show</span>
                        </div>
                  </b-form-group>
                </b-col>
              </b-row>
              <p class="f-14">Select a word or phrase that is secure and easy to remember</p>
              <div class="text-center mt-5">
                <b-button type="submit" :disabled="submitting" variant="default">
                  <b-spinner v-if="submitting" variant="secondary" small type="grow"></b-spinner>
                  <b-img v-else src="~/assets/component5.png" height="50px" alt="Image"></b-img>
                </b-button>
              </div>
            </b-form>
          </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength, alpha } from "vuelidate/lib/validators";
import isPasswordStrong from "../assets/js/validator";
import NavBar from '../components/NavBar.vue';

export default {
  components: { NavBar },
  mixins: [validationMixin],
   data() {
      return {
        showPassword: false,
        submitting: false,
        form: {
          email: '',
          username: '',
          password: '',
        },
      }
    },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      username: {
        required,
        alpha,
        minLength: minLength(3),
      },
      password: {
        isPasswordStrong,
      },
    },
  },
    methods: {
      // toggle password visibility
      switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
      
      // validate form input
      validateState(form) {
        const { $dirty, $error } = form;
        return $dirty ? !$error : null;
      },

      async registerUser() {
        // disable submit button
        this.submitting = true;

        // validation check
        this.$v.form.$touch();
          if (this.$v.form.$anyError) {
            // enable
            this.submitting = false;
            return false;
          } else {
            try {
              // authenticate user
              await this.$axios.post("/register", this.register);
                this.submitting = false;
                await this.$auth.loginWith("laravelJWT", {
                  data: {
                    email: this.form.email,
                    password: this.form.password,
                  },
                });
                 // redirect to home page or intended route
              this.$router.push({
                  path: '/personal-info'
              });
            } catch (err) {
              console.log(err);
              // enable submit button
              this.submitting = false;
              // error alert
            }
          }
        },

    }
}
</script>
<style scoped>
.f-30 {
  font-size: 30px;
}
.f-20 {
  font-size: 20px;
}
.f-14 {
  font-size: 14px;
}
.input-group-text {
  background: transparent !important;
  border-left: 0 i !important;
}
.icon-eye {
  position: absolute;
  text-align: right;
  right: 50px;
  top: 8px;
  cursor: pointer;
}
</style>