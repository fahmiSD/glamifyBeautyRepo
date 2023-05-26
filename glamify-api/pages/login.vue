<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div>
      <p class="font-poppins font-bold md:font-normal text-2xl md:text-[36px] text-[#FBF5E3] md:mb-[33px] mb-4 text-center">Log in</p>
    </div>
    <div v-if="_error">
      <p class="bg-red-500 text-red-200 text-sm p-3 mb-5">
        {{ _error }}
      </p>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="flex justify-center items-center">
        <input
          :disabled="isDisabled"
          class="md:w-[450px] w-[350px] h-[58px] mb-[24px] rounded-[20px] bg-[#164D4D] border border-[#E6E6E6] focus:outline-none ring-inset focus:border-[#FBF5E3] focus:ring focus:ring-[#FBF5E3] text-center text-[#FBF5E3] placeholder:font-inter placeholder:text-center placeholder:text-[#FBF5E3]"
          placeholder="Email or Username"
          required
          v-model="form.input"
        />
      </div>
      <div class="flex justify-center items-center">
        <input
          :disabled="isDisabled"
          type="password"
          class="md:w-[450px] w-[350px] h-[58px] mb-[24px] rounded-[20px] bg-[#164D4D] border border-[#E6E6E6] focus:outline-none ring-inset focus:border-[#FBF5E3] focus:ring focus:ring-[#FBF5E3] text-center text-[#FBF5E3] placeholder:font-inter placeholder:text-center placeholder:text-[#FBF5E3]"
          placeholder="Password"
          required
          v-model="form.password"
        />
      </div>
      <div class="text-center md:mb-[22px] mb-7">
        <a href="#" class="text-[#FBF5E3] font-inter underline underline-offset-4">Forgot password?</a>
      </div>
      <div class="text-center md:mb-[80px] mb-7">
        <button type="submit" class="bg-[#FBF5E3] rounded-[10px] md:w-[119px] md:h-[40px] px-8 py-2 md:px-0 md:py-0">
          <p class="text-[#164D4D] font-inter font-bold" v-if="isLoading"><div class="flex justify-center items-center">
            <svg version="1.1" height="40px" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
              <path fill="#164D4D" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
              </path>
            </svg>
          </div></p>
          <p class="text-[#164D4D] font-inter font-bold" v-else>SUBMIT</p>
        </button>
      </div>
      <!-- test -->
    </form>
    <div class="text-center">
      <NuxtLink to="/signup" class="text-[#FBF5E3] font-inter underline underline-offset-4 font-semibold"
        >Don't have an account yet? <br class="md:hidden" />
        Sign up!</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>

const isLoading = ref(false);
const isDisabled = ref(false);

const config = useRuntimeConfig();
console.log(config.public.BASE_URL);
function clicked() {
  const authCookie = useCookie("auth");
  authCookie.value = true;
  const reload = useCookie("reload");
  reload.value = true;
}
const _error = ref(null);
// console.log(process.env.NUXT_PUBLIC_BASE_URL);
const form = reactive({
  input: "",
  password: "",
});

async function onSubmit() {
  if (isLoading.value) return;
  if (isDisabled.value) return;

  isLoading.value = true;
  isDisabled.value = true;
  const { data, error } = await useFetch(config.public.BASE_URL + "auth/login", {
    method: "post",
    body: form,
  });

  
  if (error.value) {
    console.log(error);
    setTimeout(() => {
    _error.value = "login failed";
    isLoading.value = false;
    isDisabled.value = false;
  }, 1000)
    return;
  }
  
  const authCookie = useCookie("auth");
  authCookie.value = data.value.access_token;

  checkMe(authCookie.value);

  const reload = useCookie("reload");
  reload.value = true;
  setTimeout(() => {
    isLoading.value = false;
    isDisabled.value = false;
    navigateTo("/");
  }, 2000)
}

async function checkMe(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data, error } = await useFetch(config.public.BASE_URL + "auth/me", {
    method: "post",
    headers,
  });

  const user_id = useCookie("me_id");
  user_id.value = data.value.id;

  if (error.value) {
    console.log(error);
    return;
  }
}
</script>

<style scoped></style>
