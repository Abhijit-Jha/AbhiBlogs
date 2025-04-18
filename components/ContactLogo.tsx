import React from 'react'
import { motion } from "framer-motion"
interface ContactTypes {
    children: React.ReactNode,
    link: string
}
const ContactLogo = ({ children, link }: ContactTypes) => {
    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='cursor-pointer'
            onClick={() => {
                window.open(link)
            }}
        >
            {children}
        </motion.div>
    )
}

export default ContactLogo