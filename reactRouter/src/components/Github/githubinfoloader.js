export const githubinfoloader = async () => {
    const res = await fetch('https://api.github.com/users/Aditya-Bhandari-tech')
    return res.json();
}
