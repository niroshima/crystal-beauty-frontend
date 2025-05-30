import {createClient} from "@supabase/supabase-js";
const supabase=createClient(
    "https://qobidmgoaldqctsnvltc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvYmlkbWdvYWxkcWN0c252bHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNzA4NDUsImV4cCI6MjA2Mzk0Njg0NX0.5Fz47ZenivYVnsBxZOftQGNQziK-qbYc4193a5tlOe0"
);
export default function mediaUpload(file){
const promise=new Promise(
    (resolve,reject)=>{
        if(file==null)
        {
            reject("No file selected")
        }
        const timeStamp=new Date().getTime()//upload karana wele time eka gannawa
        const newFileName=timeStamp + file.name //upload karana file eke name wenne datetime + file name

        supabase.storage.from("images").upload(newFileName,file,{
            cacheControl:"3600",
            upsert:false,
        }).then(
            ()=>{
             const url=supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
             resolve(url)//if the promise is correct provide the url
            }
        ).catch(
            (error)=>{
                console.log(error)
                reject("File upload Failed")
            }
        )
    }
)
return promise
}


