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

module.exports.ticketRespones = (createdData) => {
    console.log(createdData);
    return ({
        title: createdData.title,
        desc: createdData.desc,
        Status: createdData.Status,
        ticketPrority: createdData.ticketPrority,
        reporter: createdData.reporter,
        assignee: createdData.assignee,
        id: createdData._id,
        createdAt: createdData.createdAt,
        updatedAt: createdData.createdAt

    })
}