export const ranker = (likesCount: number, commentCount:number, createdAt:Date) => {
    const now = new Date();
    const hoursSincePost = (now.getTime() - new Date(createdAt).getTime()) / 36e5;
    const recencyScore = Math.max(1 - hoursSincePost / 48, 0);

    const score  = (0.4 * likesCount) + (0.4 * commentCount) + (0.2 * recencyScore);
    return score;
}