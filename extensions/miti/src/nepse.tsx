import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { useState } from "react";
import { StockData, useNepseStocks } from "./utils/use-nepse";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { data: stocks, isLoading, toggleFavorite } = useNepseStocks();

  // if (!checkingPro && !isPro) {
  //   return (
  //     <List>
  //       <List.EmptyView
  //         icon={Icon.Lock}
  //         title="Pro Feature Locked"
  //         description="NEPSE Live Tracker is a Pro feature. Upgrade to unlock real-time market data."
  //         actions={
  //           <ActionPanel>
  //             <Action.OpenInBrowser
  //               title="Get Pro License"
  //               icon={Icon.Unlock}
  //               url="https://pratik.dev/miti-pro"
  //             />
  //             <Action
  //               title="Open Preferences"
  //               icon={Icon.Gear}
  //               onAction={() => openCommandPreferences()}
  //               shortcut={{ modifiers: ["cmd", "shift"], key: "," }}
  //             />
  //           </ActionPanel>
  //         }
  //       />
  //     </List>
  //   );
  // }

  return (
    <List
      isLoading={isLoading}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search stocks by symbol or name..."
      throttle={true}
      isShowingDetail
    >
      {!searchText && (
        <List.Section title="Favorites">
          {stocks
            .filter((s) => s.isFavorite)
            .map((stock) => (
              <StockListItem
                key={`fav-${stock.symbol}`}
                stock={stock}
                toggleFavorite={toggleFavorite}
              />
            ))}
        </List.Section>
      )}

      <List.Section title={searchText ? "Search Results" : "All Stocks"}>
        {stocks
          .filter((s) => {
            if (!searchText) return !s.isFavorite; // Show non-favs when no search
            return (
              s.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
              s.name.toLowerCase().includes(searchText.toLowerCase())
            );
          })
          .map((stock) => (
            <StockListItem
              key={`search-${stock.symbol}`}
              stock={stock}
              toggleFavorite={toggleFavorite}
            />
          ))}
      </List.Section>
    </List>
  );
}

// Reusing StockListItem from index.tsx
function StockListItem({
  stock,
  toggleFavorite,
}: {
  stock: StockData;
  toggleFavorite: (symbol: string) => void;
}) {
  const price = parseFloat(stock.ltp.replace(/,/g, "")) || 0;
  const change = parseFloat(stock.pointChange.replace(/,/g, "")) || 0;
  const percentChange =
    parseFloat(stock.percentageChange.replace(/,/g, "")) || 0;
  const openPrice = parseFloat(stock.open.replace(/,/g, "")) || 0;
  const previousClose = price - change;
  const qty = parseFloat(stock.qty.replace(/,/g, "")) || 0;

  const isUp = change >= 0;

  return (
    <List.Item
      title={stock.symbol}
      subtitle={stock.name}
      keywords={[stock.symbol, stock.name]}
      icon={{
        source: isUp ? Icon.ArrowUpCircle : Icon.ArrowDownCircle,
        tintColor: isUp ? Color.Green : Color.Red,
      }}
      accessories={[
        {
          text: {
            value: `Rs ${price.toLocaleString()}`,
            color: isUp ? Color.Green : Color.Red,
          },
        },
      ]}
      detail={
        <List.Item.Detail
          metadata={
            <List.Item.Detail.Metadata>
              <List.Item.Detail.Metadata.Label title="Name" text={stock.name} />
              <List.Item.Detail.Metadata.Label
                title="Ticker Symbol"
                text={stock.symbol}
              />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label title="Exchange" text="NEPSE" />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label
                title="Price"
                text={`Rs ${price.toLocaleString()}`}
              />
              <List.Item.Detail.Metadata.Label
                title="Previous Close"
                text={`Rs ${previousClose.toLocaleString()}`}
              />
              <List.Item.Detail.Metadata.Label
                title="Open"
                text={`Rs ${openPrice.toLocaleString()}`}
              />
              <List.Item.Detail.Metadata.Label
                title="Change"
                text={{
                  value: `${isUp ? "↑" : "↓"} Rs ${Math.abs(change).toFixed(2)} (${percentChange.toFixed(2)}%)`,
                  color: isUp ? Color.Green : Color.Red,
                }}
              />
              <List.Item.Detail.Metadata.Label
                title="Volume"
                text={qty.toLocaleString()}
              />
            </List.Item.Detail.Metadata>
          }
        />
      }
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            title="View on Nepse"
            url={`https://www.nepalstock.com.np/company/detail/${stock.symbol}`}
          />
          <Action
            title={
              stock.isFavorite ? "Remove from Favorites" : "Add to Favorites"
            }
            icon={stock.isFavorite ? Icon.StarDisabled : Icon.Star}
            onAction={() => toggleFavorite(stock.symbol)}
            shortcut={{ modifiers: ["cmd", "shift"], key: "f" }}
          />
        </ActionPanel>
      }
    />
  );
}
