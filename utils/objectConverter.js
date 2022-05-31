/**
 * Tranfrom The Login 
 */

module.exports.userResponse = (users) => {
    usersResponse = [];
    users.forEach(user => {
        usersResponse.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus
        })
    });
    return usersResponse 
}