import AppSideBar from "widgets/common/AppSideBar";
import AppSideBarSmall from "widgets/common/AppSideBar.Small";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex flex-1 mt-4 xl:gap-20 gap-2 lg:gap-10 px-4 justify-center">
        {/* Левая панель */}
        <div className=" flex xl:flex-1 justify-start flex-0">
          {/* Маленькая версия видна на md и ниже */}
          <div className="block lg:hidden">
            <AppSideBarSmall />
          </div>

          {/* Полная версия только на lg и выше */}
          <div className="hidden lg:flex xl:flex-1 lg:justify-end ">
            <AppSideBar />
          </div>
        </div>

        {/* Основной контент */}
        <div className="flex-1 w-full">{children}</div>

        {/* Правая панель */}
        <div className="flex-1 justify-end hidden xl:block">
          {/* <PopularPanel /> */}
        </div>
      </main>
    </div>
  );
}
