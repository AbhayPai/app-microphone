/*
 *  All Usable Libraries in this File
 */
import React from 'react';

const Navbar = () => {
    return (
        <React.Fragment>
            <nav className='navbar navbar-expand-md bg-primary navbar-dark'>
                <a className='nav-link' title='Abhay Pai' href='https://abhaypai.github.io/profile/web/#/about' aria-current='page'>
                    <img src='./images/ap-logo.jpg' alt='Abhay Pai' className='img-fluid' />
                </a>
                <button className='navbar-toggler border' type='button' data-toggle='collapse' data-target='#mainmenu'>
                    <span className='navbar-toggler-icon' />
                </button>
                <div className='collapse navbar-collapse' id='mainmenu'>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                            <a className='nav-link' href='https://abhaypai.github.io/profile/web/#/about' aria-current='page'>
                                About
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='https://abhaypai.github.io/profile/web/#/skills'>
                                Skills
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='https://abhaypai.github.io/profile/web/#/education'>
                                Education
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='https://abhaypai.github.io/profile/web/#/work-experience'>
                                Work Experience
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link active' href='https://abhaypai.github.io/profile/web/#/project'>
                                Project
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='https://abhaypai.github.io/profile/web/#/basic-frameworks'>
                                Basic Frameworks
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='https://abhaypai.github.io/profile/web/#/concepts'>
                                Concepts
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='https://abhaypai.github.io/profile/web/#/' />
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;

