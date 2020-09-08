import React from 'react';
import {AiOutlineTwitter } from "react-icons/ai";
import {FaLinkedinIn,FaFacebookF} from 'react-icons/fa';



export const pageLinks = [
    {page: 'Contact' , link: '/contact'},
    {page: 'Login' , link: '/login'},
    {page: 'Register' , link: '/register'},
]

export const socialLinks = [
    {icon: <FaFacebookF/>, href: 'http://facebook.com/cwangayi'},
    {icon: <AiOutlineTwitter/>, href: 'http://twitter.com/watacle28'},
    {icon: <FaLinkedinIn/>, href: 'http://linkedin.com/cwangayi'}
]