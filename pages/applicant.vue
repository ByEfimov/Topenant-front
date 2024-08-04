<template>
    <div v-if="!approvedTicket" class="content">
        <Work
            v-for="(work, index) in data"
            :key="work.id"
            v-motion
            :work="work"
            :initial="{
                opacity: 0,
                y: 50,
            }"
            :enter="{
                opacity: 1,
                y: 0,
                transition: { delay: index * 100 },
            }"
        />
    </div>
    <div v-else class="content">
        <Work
            v-motion
            :work="approvedTicket.work"
            :initial="{
                opacity: 0,
                y: 50,
            }"
            :enter="{
                opacity: 1,
                y: 0,
                transition: { delay: 0 },
            }"
        />
        <div
            v-motion
            class="centerText"
            :initial="{
                opacity: 0,
                y: 50,
            }"
            :enter="{
                opacity: 1,
                y: 0,
                transition: { delay: 400 },
            }"
        >
            Через {{ approvedTicket.work.timeToJob }} часов ты получишь от
            работодателя {{ approvedTicket.work.pointsToGive }} очков!
        </div>
        <div
            v-motion
            class="centerText"
            :initial="{
                opacity: 0,
                y: 50,
            }"
            :enter="{
                opacity: 1,
                y: 0,
                transition: { delay: 600 },
            }"
        >
            Сейчас у тебя: {{ user?.points || 0 }} очков, ты на 1 месте
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { useWorksStore } from '~/store/works';

const worksStore = useWorksStore();
const { approvedTicket } = storeToRefs(worksStore);
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { data } = useAsyncData(async () => {
    if (!approvedTicket.value) {
        return await worksStore.getWorks();
    }
});
</script>

<style lang="scss" scoped>
@import url('@/assets/styles/pages/index.scss');
</style>
