import { useState, useEffect, useRef } from "react";
import { Send, Search } from "lucide-react";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "👩‍💼",
      lastMessage: "Sounds good! See you tomorrow",
      time: "2:45 PM",
      unread: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "👨‍💻",
      lastMessage: "Thanks for the update",
      time: "1:20 PM",
      unread: false,
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "👩‍🎨",
      lastMessage: "Love the design! Let's discuss more",
      time: "11:00 AM",
      unread: false,
    },
    {
      id: 4,
      name: "Alex Martinez",
      avatar: "👨‍⚕️",
      lastMessage: "Perfect, I'll send it over",
      time: "Yesterday",
      unread: false,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0],
  );
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi! How are you doing?",
      time: "2:30 PM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Hey Sarah! Doing great, thanks for asking!",
      time: "2:35 PM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "That's awesome! Want to grab coffee tomorrow?",
      time: "2:40 PM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Absolutely! What time works for you?",
      time: "2:42 PM",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content: "Sounds good! See you tomorrow",
      time: "2:45 PM",
      isOwn: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "320px",
          backgroundColor: "#fff",
          borderRight: "1px solid #e5e5e5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px", borderBottom: "1px solid #e5e5e5" }}>
          <h1
            style={{
              margin: "0 0 16px 0",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Messages
          </h1>
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "12px",
                top: "12px",
                color: "#999",
              }}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 10px 10px 40px",
                border: "1px solid #e5e5e5",
                borderRadius: "20px",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              style={{
                padding: "12px 8px",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                backgroundColor:
                  selectedConversation.id === conv.id
                    ? "#f0f0f0"
                    : "transparent",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (selectedConversation.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = "#f9f9f9";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedConversation.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div style={{ fontSize: "32px" }}>{conv.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#000",
                      }}
                    >
                      {conv.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#999" }}>
                      {conv.time}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: conv.unread ? "500" : "400",
                    }}
                  >
                    {conv.lastMessage}
                  </div>
                </div>
                {conv.unread && (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#0084ff",
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "32px" }}>{selectedConversation.avatar}</div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#000" }}>
              {selectedConversation.name}
            </div>
            <div style={{ fontSize: "12px", color: "#999" }}>Active now</div>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: msg.isOwn ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "60%",
                  padding: "10px 14px",
                  borderRadius: msg.isOwn
                    ? "18px 4px 18px 18px"
                    : "4px 18px 18px 18px",
                  backgroundColor: msg.isOwn ? "#0084ff" : "#e4e6eb",
                  color: msg.isOwn ? "#fff" : "#000",
                  fontSize: "14px",
                  lineHeight: "1.4",
                  wordWrap: "break-word",
                }}
              >
                {msg.content}
                <div
                  style={{ fontSize: "12px", marginTop: "4px", opacity: 0.7 }}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e5e5e5",
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
          }}
        >
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "1px solid #e5e5e5",
              borderRadius: "20px",
              fontSize: "14px",
              fontFamily: "inherit",
              outline: "none",
              resize: "none",
              maxHeight: "100px",
              minHeight: "44px",
              boxSizing: "border-box",
            }}
            rows="1"
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: "10px 16px",
              backgroundColor: "#0084ff",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0073e6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#0084ff";
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}