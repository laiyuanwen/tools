import { defineComponent } from "vue";
import "./style.sass"
import { useStore } from "vuex";
import { Project } from "@/Constant";
import { ProjectActionType } from "@/store/modules/project/ProjectStore";

export default defineComponent({
    setup() {
        const store = useStore()
        const projectList = store.state.project.projectList as Project[]

        const openProject = (project) => async () => {
            await store.dispatch(ProjectActionType.OPEN_PROJECT, project)
        }

        return () => (
            <div>
                { projectList.map(p => (<div class="project-item">
                    <div> name:{ p.name } </div>
                    <div> git:{ p.git } </div>
                    <div> path:{ p.path } </div>
                    <a-button onClick={ openProject(p) } type="primary">打开</a-button>
                </div>)) }
            </div>
        );
    },
});