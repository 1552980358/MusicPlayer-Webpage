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

console.log('   ____ _                 _           ____  _               \n' +
    '  / ___| | ___  _   _  __| |         |  _ \\(_) ___  ___ ___ \n' +
    ' | |   | |/ _ \\| | | |/ _` |  _____  | |_) | |/ _ \\/ __/ _ \\\n' +
    ' | |___| | (_) | |_| | (_| | |_____| |  __/| |  __/ (_|  __/\n' +
    '  \\____|_|\\___/ \\__,_|\\__,_|         |_|   |_|\\___|\\___\\___|\n' +
    '  __  __           _        ____  _                         \n' +
    ' |  \\/  |_   _ ___(_) ___  |  _ \\| | __ _ _   _  ___ _ __   \n' +
    ' | |\\/| | | | / __| |/ __| | |_) | |/ _` | | | |/ _ \\ \'__|  \n' +
    ' | |  | | |_| \\__ \\ | (__  |  __/| | (_| | |_| |  __/ |     \n' +
    ' |_|  |_|\\__,_|___/_|\\___| |_|   |_|\\__,_|\\__, |\\___|_|     \n' +
    ' __        __   _          _              |___/             \n' +
    ' \\ \\      / /__| |__      / \\   _ __  _ __                  \n' +
    '  \\ \\ /\\ / / _ \\ \'_ \\    / _ \\ | \'_ \\| \'_ \\                 \n' +
    '   \\ V  V /  __/ |_) |  / ___ \\| |_) | |_) |                \n' +
    '    \\_/\\_/ \\___|_.__/  /_/   \\_\\ .__/| .__/                 \n' +
    '                               |_|   |_|                    ');
console.log('Android Application: https://github.com/1552980358/MusicPlayer');
console.log('Web Application: https://github.com/1552980358/MusicPlayer-Webpage');
console.log('Maintained by: https://github.com/1552980358');