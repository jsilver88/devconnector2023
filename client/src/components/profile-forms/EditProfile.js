import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  })

  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  useEffect(() => {
    getCurrentProfile()

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
    })
  }, [loading, getCurrentProfile])

  const navigate = useNavigate()

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    createProfile(formData, navigate, true)
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <FontAwesomeIcon icon={faUser} /> Let's get some information to make
        your profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='status'
            value={formData.status}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={formData.company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={formData.website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={formData.location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>City & state suggested</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={formData.skills}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={formData.githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            type='text'
            placeholder='A short bio about yourself'
            name='bio'
            value={formData.bio}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ color: '#38a1f3', padding: '.5rem' }}
              />{' '}
              <input
                type='text'
                placeholder='Twitter'
                name='twitter'
                value={formData.twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ color: '#3b5998', padding: '.5rem' }}
              />{' '}
              <input
                type='text'
                placeholder='Facebook'
                name='facebook'
                value={formData.facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faYoutube}
                style={{ color: '#c4302b', padding: '.5rem' }}
              />{' '}
              <input
                type='text'
                placeholder='Youtube'
                name='youtube'
                value={formData.youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faLinkedinIn}
                style={{ color: '#0077b5', padding: '.5rem' }}
              />{' '}
              <input
                type='text'
                placeholder='Linkedin'
                name='linkedin'
                value={formData.linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: '#3f729b', padding: '.5rem' }}
              />{' '}
              <input
                type='text'
                placeholder='Instagram'
                name='instagram'
                value={formData.instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard' className='btn btn-light my-1'>
          Go Back
        </Link>
      </form>
    </section>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
)
