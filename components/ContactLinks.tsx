import React from 'react'
import ContactLogo from './ContactLogo';
import { contact } from '../utils/contactLinks';
const ContactLinks = () => {
    return (
        <div className='flex justify-center space-x-10 pt-4'>
            {contact.map((con, index) => {
                return <ContactLogo link={con.link} key={`${index}`}>{con.element}</ContactLogo>
            })}
        </div>
    )
}

export default ContactLinks