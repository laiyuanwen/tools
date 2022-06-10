import { ref, defineComponent } from "vue";
import "./style.sass"

export default defineComponent({
    setup() {
        const navs = [
            { name: "工作台", path: "workspace" }, // 干活的地方
            { name: "项目", path: "project" }, // 管理多个项目的地方
            { name: "工具箱", path: "tools" }, // 各种工具集合
            { name: "设置", path: "settings" }, // 设置
        ]

        return () => (
            <div class="navigation-container">
                <div style="height: 70px;">头像</div>
                { navs.map(item => (
                    <div class="nav-item">
                        <router-link to={ item.path }>{ item.name }</router-link>
                    </div>
                )) }
            </div>
        );
    },
});