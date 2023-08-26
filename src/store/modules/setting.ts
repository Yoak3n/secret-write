import {defineStore} from 'pinia';


export const useSettingStore = defineStore('setting',{
    state: () => ({
        foreground_color:"rgba(255,255,255,1)",
        background_color:"rgba(255,255,255,0)",
        output_file_path:"./output.txt",
        showHand:true,
        showInputBorder:'1px solid'
        
    }),
    actions:{
        change_foreground_color(color:string){
            this.foreground_color = color
        },
        change_background_color(color:string){
            this.background_color = color
        },
        change_file_path(path:string){
            this.output_file_path = path
        },
        change_hand_show(){
            this.showHand = !this.showHand
        }
    },
    getters:{
        change_input_boder(state):string{
            return state.showHand ? '1px solid':'none'
        },
        get_show_boder(state){
            return state.showHand
        }
    }

})