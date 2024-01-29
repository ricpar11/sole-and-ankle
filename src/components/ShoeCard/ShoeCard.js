import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

    const tagsData = {
        'on-sale': {
            text: 'Sale',
            backgroundColor: COLORS.primary,
            color: COLORS.white,

        },
        'new-release': {
            text: 'Just Released!',
            backgroundColor: COLORS.secondary,
            color: COLORS.white,
        }
    }



  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
            {variant !== "default" && <Tag style={{"--color": tagsData[variant].color, "--background-color": tagsData[variant].backgroundColor }} >{
                tagsData[variant].text
            }</Tag>}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
            <Price
                style={{'--text-decoration-line': variant === 'on-sale' ? 'line-through' : "none"}}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 0 340px;
  min-width: 324px;
`;

const Wrapper = styled.article`
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 7px 9px;
  border-radius: 2px;
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color);
  background-color: var(--background-color);
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
    width: 100%;`
;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    text-decoration-line: var(--text-decoration-line)`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
