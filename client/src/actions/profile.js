import axios from 'axios'
import { setAlert } from './alert'

import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
} from './types'

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })

  try {
    const res = await axios.get('/api/profile')

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const res = await axios.post('/api/profile', formData, config)

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      )

      if (!edit) {
        navigate('/dashboard')
      }
    } catch (error) {
      const errors = error.response.data.errors

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      })
    }
  }

// Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.put('/api/profile/experience', formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Experience Added', 'success'))

    navigate('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.put('/api/profile/education', formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Education Added', 'success'))

    navigate('/dashboard')
  } catch (error) {
    const errors = error.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Experience deleted', 'success'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Education deleted', 'success'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

// Delete Account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/profile`)

      dispatch({
        type: CLEAR_PROFILE,
      })
      dispatch({
        type: DELETE_ACCOUNT,
      })

      dispatch(setAlert('Your account has been successfully deleted'))
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      })
    }
  }
}
