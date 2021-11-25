export const userName = (user: any) => {
    if (user.firstName && user.lastName) {
        return user.firstName + " " + user.lastName;
    }
    return user.email || "~ Unknown ~";
}
