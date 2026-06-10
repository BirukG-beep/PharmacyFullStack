export const   formatDate = () => {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return now.toLocaleDateString('en-US', options);
    };