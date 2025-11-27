<template>
  <span :class="totalTime < 15 ? 'text-red-600' : 'text-secondary'">
    {{ minutes }}:{{ seconds }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  time?: number;
}

const props = withDefaults(defineProps<Props>(), {
  time: 5,
});

const emit = defineEmits<{
  'time-check': [time: number];
}>();

const totalTime = ref(props.time * 60);
let intervalId: ReturnType<typeof setInterval> | null = null;

const minutes = computed(() => String(Math.floor(totalTime.value / 60)).padStart(2, '0'));
const seconds = computed(() => String(totalTime.value % 60).padStart(2, '0'));

const startCountdown = () => {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (totalTime.value > 0) {
      totalTime.value--;
      emit('time-check', totalTime.value);
    } else {
      if (intervalId) clearInterval(intervalId);
    }
  }, 1000);
};

const resetCountdown = () => {
  if (intervalId) clearInterval(intervalId);
  totalTime.value = props.time * 60;
  emit('time-check', totalTime.value);
  startCountdown();
};

defineExpose({ resetCountdown });

onMounted(startCountdown);
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
