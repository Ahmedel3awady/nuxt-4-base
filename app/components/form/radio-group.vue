<template>
  <div>
    <URadioGroup
      v-model="value"
      :items="items"
      size="xl"
      variant="card"
      class="custom-radio-group"
      v-bind="{ ...options, ...$attrs }"
      :ui="{
        root: 'p-0',
        base: `${errors.length ? 'border-error' : 'border-gray-300'}`,
        fieldset: 'gap-5 flex-row items-center justify-center flex-wrap',
        container: 'opacity-0 absolute',
        item: `
        border
        border-[#f6faf633]
        bg-[#f6faf633]
        hover:bg-[linear-gradient(87.07deg,rgba(81,83,82,0.2)_-0.49%,rgba(192,255,201,0.2)_102.25%)]
        has-data-[state=checked]:bg-[linear-gradient(87.07deg,rgba(0,0,0,0.2)_-0.49%,rgba(73,255,98,0.2)_102.25%)]
          custom-radio-group-label 
          cursor-pointer  
           ${errors.length ? ' !border-error' : ''}`,
      }"
    >
      <template #label="{ item }">
        <div class="flex items-center flex-col gap-6">
          <core-lazy-image
            :src="item.icon"
            placeholder-src="/icon.png"
            class="w-12 h-12 pointer-events-none"
            v-if="item?.icon"
          />
          <span class="custom-radio-group-label-text text-light text-lg font-medium">{{
            item.label
          }}</span>
        </div>
      </template>
    </URadioGroup>
    <transition name="fade-up">
      <p v-if="errors.length" class="text-error text-sm text-center mt-4 px-4">
        {{ errors[0] }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { RadioGroupItem, RadioGroupProps } from '@nuxt/ui';

defineOptions({
  inheritAttrs: false,
});

interface Props {
  name: string;
  items: RadioGroupItem[];
  options?: RadioGroupProps;
}

const props = withDefaults(defineProps<Props>(), {});
const nameRef = toRef(props, 'name');
const { value, errors } = useField<string>(nameRef);
</script>
<style>
.custom-radio-group {
  padding: 0 !important;
}
.custom-radio-group .custom-radio-group-label {
  height: 145px;
  width: 270px;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  align-items: center;
}
.big-radio-group.custom-radio-group .custom-radio-group-label {
  width: 31.333%;
}
.has-data-\[state\=checked\]\:border-primary {
  /* border: 1px solid #008000; */
}
</style>
