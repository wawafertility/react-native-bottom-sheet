import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { useBottomSheetInternal } from '../../hooks';
import { KEYBOARD_STATE } from '../../constants';
import type { BottomSheetFooterContainerProps } from './types';

const BottomSheetFooterContainerComponent = ({
  renderFooter,
}: BottomSheetFooterContainerProps) => {
  //#region hooks
  const {
    animatedContainerHeight,
    animatedHandleHeight,
    animatedFooterHeight,
    animatedPosition,
    animatedKeyboardState,
    animatedKeyboardHeightInContainer,
  } = useBottomSheetInternal();
  //#endregion

  //#region variables
  const animatedFooterPosition = useDerivedValue(() => {
    const keyboardHeight = animatedKeyboardHeightInContainer.value;
    let footerTranslateY = Math.max(
      0,
      animatedContainerHeight.value - animatedPosition.value
    );

    if (animatedKeyboardState.value === KEYBOARD_STATE.SHOWN) {
      footerTranslateY = footerTranslateY - keyboardHeight;
    }

    footerTranslateY =
      footerTranslateY -
      animatedFooterHeight.value -
      animatedHandleHeight.value;

    return footerTranslateY;
  }, [
    animatedKeyboardHeightInContainer,
    animatedContainerHeight,
    animatedPosition,
    animatedKeyboardState,
    animatedFooterHeight,
    animatedHandleHeight,
  ]);
  //#endregion

  return renderFooter({ animatedFooterPosition });
};

const BottomSheetFooterContainer = memo(BottomSheetFooterContainerComponent);
BottomSheetFooterContainer.displayName = 'BottomSheetFooterContainer';

export default BottomSheetFooterContainer;
