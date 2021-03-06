declare module 'element-ui/lib/locale/lang/ko' {}
declare module 'lodash/camelCase' {
  interface camelCase {
    camelCase: object;
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: camelCase;

  // 3. 내보내기(CommonJS)
  export = _;
}
declare module 'lodash' {
  interface ILodash {
    camelCase(str?: string): string;
    omit(data?: object, arr?: any): object;
    cloneDeep<T>(val: T, customizer?: (value: any) => any, thisArg?: any): T;
    uniq(data?: string[]): string[];
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: ILodash;

  // 3. 내보내기(CommonJS)
  export = _;
}
declare module 'vue-fragment' {
  interface Fragment {
    Fragment: object;
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: Fragment;

  // 3. 내보내기(CommonJS)
  export = _;
}
