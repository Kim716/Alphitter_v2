import { postTweetLike, postTweetUnLike } from "api/tweetAuth";
import { useContext } from "react";
import { TweetContext } from "contexts/TweetContext";

import { ReactComponent as HeartUnfocus } from "assets/icons/heart_unfocus.svg";
import { ReactComponent as HeartFocus } from "assets/icons/heart_focus.svg";

function LikeIcon({ isLiked, tweetId }) {
  const {
    tweets,
    setTweets,
    tweet,
    setTweet,
    userLikedTweets,
    setUserLikedTweets,
  } = useContext(TweetContext);

  // 切換愛心狀態
  const handleLikeClick = async (e) => {
    e.stopPropagation();

    try {
      if (isLiked) {
        await postTweetUnLike(tweetId);

        // 在 MainPage, UserMainPage 點擊取消喜歡會更動數字與愛心樣式
        setTweets(
          tweets.map((tweet) => {
            if (tweet.id === Number(tweetId)) {
              return {
                ...tweet,
                likeCount: tweet.likeCount - 1,
                isLiked: !tweet.isLiked,
              };
            }
            return tweet;
          })
        );

        // 在 TweetPage 點擊取消喜歡會更動數字與愛心樣式
        setTweet({
          ...tweet,
          likeCount: tweet.likeCount - 1,
          isLiked: !tweet.isLiked,
        });

        // 在 UserLikesPage 點擊取消喜歡會直接將該推文從畫面移除
        setUserLikedTweets(
          userLikedTweets.filter((tweet) => tweet.TweetId !== Number(tweetId))
        );
      } else {
        await postTweetLike(tweetId);

        // 在 MainPage, UserMainPage 點擊喜歡會更動數字與愛心樣式
        setTweets(
          tweets.map((tweet) => {
            if (tweet.id === Number(tweetId)) {
              return {
                ...tweet,
                likeCount: tweet.likeCount + 1,
                isLiked: !tweet.isLiked,
              };
            }
            return tweet;
          })
        );

        // 在 TweetPage 點擊取消喜歡會更動數字與愛心樣式
        setTweet({
          ...tweet,
          likeCount: tweet.likeCount + 1,
          isLiked: !tweet.isLiked,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return isLiked ? (
    <HeartFocus onClick={handleLikeClick} />
  ) : (
    <HeartUnfocus onClick={handleLikeClick} />
  );
}

export default LikeIcon;
