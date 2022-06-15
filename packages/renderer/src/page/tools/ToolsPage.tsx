import { defineComponent } from "vue";
import "./style.sass"
import { useStore } from "vuex";
import * as Utils from "../../../../utils";
import * as Store from "../../../../store";
import { Project } from "@/Constant";
import { ProjectActionType } from "@/store/modules/project/ProjectStore";

export default defineComponent({
    setup() {
        const store = useStore()
        const projectList = store.state.project.projectList as Project[]

        const openProject = (project) => async () => {
            await store.dispatch(ProjectActionType.OPEN_PROJECT, project)
        }

        const inputTextToAdb = () => {
            Utils.inputText(Utils.getDeviceList()[0], "test")
            Store.storeAdbInput()
        }

        return () => (
            <div>
                <div> 工具箱列表（选择使用什么工具） </div>

                <div>
                    adb 工具

                    选择设备
                    <div>xxx设备</div>

                    输入框
                    <a-input></a-input>
                    <a-button onClick={inputTextToAdb}>确认</a-button>

                    最近输入
                    <div>xxxx</div>
                </div>

            </div>
        );
    },
});
