<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div>
      <p class="font-poppins font-bold text-2xl md:font-normal md:text-[36px] text-[#FBF5E3] md:mb-[33px] mb-4 text-center">Sign up</p>
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
          class="md:w-[450px] w-[350px] h-[58px] mb-[24px] rounded-[20px] bg-[#164D4D] border border-[#E6E6E6] focus:outline-none ring-inset focus:ring focus:ring-[#FBF5E3] focus:border-[#FBF5E3] text-center text-[#FBF5E3] placeholder:font-inter placeholder:text-center placeholder:text-[#FBF5E3]"
          placeholder="Name"
          required
          v-model="form.name"
        />
      </div>
      <div class="flex justify-center items-center">
        <input
        :disabled="isDisabled"
          type="email"
          class="md:w-[450px] w-[350px] h-[58px] mb-[24px] rounded-[20px] bg-[#164D4D] border border-[#E6E6E6] focus:outline-none ring-inset focus:ring focus:ring-[#FBF5E3] focus:border-[#FBF5E3] text-center text-[#FBF5E3] placeholder:font-inter placeholder:text-center placeholder:text-[#FBF5E3]"
          placeholder="Email"
          required
          v-model="form.email"
        />
      </div>
      <div class="flex justify-center items-center">
        <input
        :disabled="isDisabled"
          class="md:w-[450px] w-[350px] h-[58px] mb-[24px] rounded-[20px] bg-[#164D4D] border border-[#E6E6E6] focus:outline-none ring-inset focus:ring focus:ring-[#FBF5E3] focus:border-[#FBF5E3] text-center text-[#FBF5E3] placeholder:font-inter placeholder:text-center placeholder:text-[#FBF5E3]"
          placeholder="Username"
          required
          v-model="form.username"
        />
      </div>
      <div class="flex justify-center items-center">
        <input
        :disabled="isDisabled"
          type="password"
          class="md:w-[450px] w-[350px] h-[58px] mb-[46px] rounded-[20px] bg-[#164D4D] border border-[#E6E6E6] focus:outline-none ring-inset focus:ring focus:ring-[#FBF5E3] focus:border-[#FBF5E3] text-center text-[#FBF5E3] placeholder:font-inter placeholder:text-center placeholder:text-[#FBF5E3]"
          placeholder="Password"
          required
          v-model="form.password"
        />
      </div>

      <div class="mb-[46px] flex justify-center">
        <div class="w-[10px] h-[10px] bg-[#FBF5E3] rounded-full mr-[27px]"></div>
        <div class="w-[10px] h-[10px] border-solid border-2 border-[#FBF5E3] rounded-full"></div>
      </div>

      <div class="text-center">
        <button type="submit" class="bg-[#FBF5E3] rounded-[10px] w-[119px] h-[40px]">
          <p class="text-[#164D4D] font-inter font-bold" v-if="isLoading"><div class="flex justify-center items-center">
            <svg version="1.1" height="40px" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
              <path fill="#164D4D" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
              </path>
            </svg>
          </div></p>
          <p class="text-[#164D4D] font-inter font-bold" v-else>NEXT</p>
        </button>
        <!-- <a
          href="/confirmEmail"
          class="bg-[#FBF5E3] px-[45px] py-[12px] rounded-[10px] w-[119px] h-[40px] text-[#164D4D] font-inter font-bold"
          >NEXT</a
        > -->
      </div>
    </form>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const _error = ref(null);
const isLoading = ref(false);
const isDisabled = ref(false);

const form = reactive({
  name: "",
  email: "",
  username: "",
  password: "",
});

async function onSubmit() {
  if (isLoading.value) return;
  if (isDisabled.value) return;
  isLoading.value = true;
  isDisabled.value = true;
  const { data, error } = await useFetch(config.public.BASE_URL + "auth/register", {
    method: "post",
    body: form,
  });
  if (error.value) {
    console.log(error.value);
    setTimeout(() => {
    _error.value = "register failed";
    isLoading.value = false;
    isDisabled.value = false;
  }, 1000)
    return;
  }
  setTimeout(() => {
    isLoading.value = false;
    isDisabled.value = false;
    navigateTo("/confirmEmail");
  }, 2000)
  
}
</script>

<style scoped></style>
