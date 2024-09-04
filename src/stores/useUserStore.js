import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  
  const clientId = ref(process.env.VUE_APP_CLIENT_ID)
  const clientSecret = ref(process.env.VUE_APP_CLIENT_SECRET)
  const userData = ref({})

  const fetchUserDataFrom = async (code) => {
    try {
      localStorage.setItem('gCode', JSON.stringify(code))

      const { data } = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: clientId.value,
          client_secret: clientSecret.value,
          redirect_uri: process.env.VUE_APP_REDIRECT_URL,
          grant_type: 'authorization_code',
        },
      )

      if (data) {
        const accessToken = data.access_token
        const userObj = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        if (userObj && userObj.data) {
          localStorage.setItem('user', JSON.stringify(userObj.data))
          userData.value = userObj.data
        }
        else {
          console.error('Failed to fetch user data')
        }
      }
    }
    catch (e) {
      console.error('Failed to exchaange token', e)
    }
  }

  return {
    clientId,
    clientSecret,
    userData,
    fetchUserDataFrom,
  }
})

export default useUserStore
