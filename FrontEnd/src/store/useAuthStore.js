import {create} from "zustand"
import axiosInstance from "../lib/axios.js"
import toast from "react-hot-toast";
import io from "socket.io-client";


const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:5001":"/"; 

export const useAuthStore= create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLogginIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try{
            const response=await axiosInstance.get("/auth/check");
            set({
                authUser: response.data
            })
            get().connectSocket()
        }
        catch(error){
            set({
                authUser: null
            })
            console.log(error)
            console.log("error in check auth")
        }
        finally{
            set({
                isCheckingAuth:false
            })
        }
    },
    signup:async(data)=>{
        set({
            isSigningUp:true
        })
        try{
            const res=await axiosInstance.post("auth/signup",data)
            set({
                authUser:res.data
            })
            toast.success("Signup successful")
            get().connectSocket()
        }
        catch(e){
            toast.error(e.messsage)
           
        }
        finally{
            set({
                isSigningUp:false
            })
        }
    },
    logout:async()=>{
        try{
            await axiosInstance.post("/auth/logout")
            set({
                authUser:null
            })
            toast.success("Logged out successfully")
            get().disconnectSocket()
        }
        catch(e){
            toast.error(e.message)
        }
    },
    login:async(data,navigate)=>{
        set({
            isLoggingIn:true
        })
        try{
            const res=await axiosInstance.post("/auth/login",data)
            set({
                authUser:res.data
            })
            toast.success("Login successful")
            navigate("/")
            get().connectSocket()
        }
        catch(e){
            toast.error("Invalid email or password")
            
        }
        finally{
            set({
                isLoggingIn:false
            })
        }
    },
   updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket:()=>{
    const {authUser}=get()
    if(!authUser || get().socket?.connected){
      return
    }
    const socket=io(BASE_URL,{
        query:{
          userId:authUser._id
        }
    })
    socket.connect()
    set({
        socket:socket
    })
    socket.on("getOnlineUsers",(users)=>{
      set({
        onlineUsers:users
      })
    })
    
  },
  disconnectSocket:()=>{
    if(get().socket?.connected) get().socket.disconnect();
  }

 
    

    
}))