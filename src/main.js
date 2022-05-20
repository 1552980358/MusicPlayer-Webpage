import { createApp } from 'vue'
import App from './App.vue'

import IndexPage from "@/page/IndexPage";
import DownloadPage from "@/page/DownloadPage";
import UploadPage from "@/page/UploadPage";
import PlayerPage from "@/page/PlayerPage";
import { createRouter, createWebHashHistory } from "vue-router";

const app = createApp(App);
app.use(
    createRouter({
        history: createWebHashHistory(),
        routes: [
            { path: '/', component: IndexPage },
            { path: '/download', component: DownloadPage },
            { path: '/upload', component: UploadPage },
            { path: '/player', component: PlayerPage },
        ],
    })
);
app.mount('#app');