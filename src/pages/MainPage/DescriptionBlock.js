import React, { useState } from "react"
import classesCss from "./MainPage.module.scss"
import cx from "classnames"
import Button from "../../components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LearnMoreButton from "../../components/Buttons/LearnMoreButton";

const slideCount = 2;
export default function DescriptionBlock({className}){

  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className={classesCss.DescriptionBlock}>
      <div className={classesCss.SlideBlock}>
        <div className={cx(
          classesCss.Slide,
          {[classesCss.Active]: currentSlide === 0},
        )}>
          <h2>RSLang</h2>
          <Link className={classesCss.LearnMoreLink} to={"/about"}>
            <LearnMoreButton/>
          </Link>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
            make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing
          </p>
        </div>
        <div className={cx(
          classesCss.Slide,
          {[classesCss.Active]: currentSlide === 1},
        )}>
          <h2>Наша команда</h2>
          <Link className={classesCss.LearnMoreLink} to={"/team"}>
            <LearnMoreButton />
          </Link>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
            make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing
          </p>
        </div>
      </div>
      <div className={classesCss.NavigationBlock}>
        <div className={classesCss.Pagination}>
          {
            Array(slideCount).fill(null).map((el, index) => {
              console.log(111)
              return (
                <Button
                  className={cx(
                    classesCss.PaginationButton,
                    {[classesCss.Active]: index === currentSlide},
                  )}
                  onClick={() => setCurrentSlide(index)}
                />
              )
            })
          }
        </div>
        <div className={classesCss.ButtonBlock}>
          <Button
            className={classesCss.NavigationButton}
            label={<FontAwesomeIcon icon={faAngleLeft}/>}
            onClick={currentSlide - 1 >= 0 ?
              () => setCurrentSlide(currentSlide - 1)
              : () => setCurrentSlide(slideCount - 1)
            }
          />
          <Button
            className={classesCss.NavigationButton}
            label={<FontAwesomeIcon icon={faAngleRight}/>}
            onClick={currentSlide + 1 < slideCount ?
              () => setCurrentSlide(currentSlide + 1)
              : () => setCurrentSlide(0)
            }
          />
        </div>
      </div>
    </div>
  )
}