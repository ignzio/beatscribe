import Logo from './Logo'
import styles from './Navbar.module.css'
function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Logo />
        </nav>
    )
}

export default Navbar