import React from "react"
import classesCss from "./MainPage.module.scss"
import GitHubButton from "../../components/Buttons/GitHubButton";
import {rssLogo} from "../../assets/logo";


export default function Footer(){
  return(
    <div className={classesCss.Footer}>
      <div className={classesCss.RSSData}>

        <a href={"https://rs.school"} className={classesCss.RSSLink}>{rssLogo}</a>
        <div className={classesCss.FooterDate}><span>2021 г.</span></div>
      </div>
      <div className={classesCss.Authors}>
        <GitHubButton nickName={"heyheyjude"} label={"Антон"} className={classesCss.GHButton}/>
        <GitHubButton nickName={"ivan-scherbuk"} label={"Иван"} className={classesCss.GHButton}/>
        <GitHubButton nickName={"pannage"} label={"Татьяна"} className={classesCss.GHButton}/>
        <GitHubButton nickName={"AnnaDavydenko"} label={"Анна"} className={classesCss.GHButton}/>
      </div>

    </div>
  )

}