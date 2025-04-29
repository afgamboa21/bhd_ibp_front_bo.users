import { Subscription } from 'rxjs';
import { SafeAny } from '../../types/types/safe-any';

export function Unsubscribe(
  target: SafeAny,
  methodName: string,
  description: PropertyDescriptor,
) {
  const prototype = target.constructor.prototype;
  let subscription: Subscription;
  const method = description.value;

  description.value = function (...args: unknown[]) {
    subscription = method.apply(this, args);
  };

  const onDestroy =
    prototype.ngOnDestroy ??
    (() => {
      console.log('ngOnDestroy not implemented');
    });
  prototype.ngOnDestroy = function () {
    onDestroy.call(this);
    subscription?.unsubscribe?.();
  };
}
