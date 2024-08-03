import { useAuthStore } from '~/store/auth';
import { useWorksStore } from '~/store/works';

export default defineNuxtPlugin(async () => {
    if (process.server) {
        return;
    }
    const authStore = useAuthStore();
    const workStore = useWorksStore();
    await authStore.me();
    if (authStore.user?.id)
        await workStore.getTicketsByUser(authStore.user?.id);
});
