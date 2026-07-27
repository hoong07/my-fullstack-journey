#include<stdio.h>
#include<stdlib.h>

#define NAMESIZE 20

typedef struct ANYNODE //图节点
{
    char node;
    struct ANYNODE* next;  
}ANYNODE;
typedef ANYNODE* ANODE;

// 当前结点 头节点
typedef struct CURNODE
{
    char node;
    ANODE child;
}CURNODE;
typedef CURNODE* CUR;

//树分支节点
typedef struct GRAPHNODE
{
    CUR node;//当前头节点
    struct GRAPHNODE* next;//垂直连接构造树结构
}GRAPHNODE;
typedef GRAPHNODE* GRAPH;

// 栈结构 用于查找
typedef struct STACKNODE
{
    char name;
    struct STACKNODE* next;
} STACKNODE;
typedef STACKNODE* STACK;

typedef struct PATHNODE
{
    STACK TOPPANTH;
    struct PATHNODE* PATHLINK;
}PATHNODE;
typedef PATHNODE* PATH;

ANODE appendBrotherNode(ANODE br, char node)//当前节点的相邻节点之间的连接
{
    ANODE p1 = (ANODE)malloc(sizeof(ANYNODE));
    p1->node = node;
    p1->next = NULL;

    if (!br)
    {
        return p1;
    }

    ANODE p2 = br;
    while (p2->next)
    {
        p2 = p2->next;
    }
    p2->next = p1;
    return br;
}

//当前头节点与相邻节点构建子图
GRAPH CreatTree(char panode, ANODE br)
{
    GRAPH root = (GRAPH)malloc(sizeof(GRAPHNODE));
    root->node = (CUR)malloc(sizeof(CURNODE));
    root->node->node = panode;
    root->node->child = br;
    root->next = NULL;
    return root;
}

//连接头 图节点
GRAPH addTree(GRAPH tree, GRAPH newtree)
{
    GRAPH root = tree;
    if (!tree)//图空 没有图
    {
        tree = newtree;
    }
    else {
        while (root->next)
        {
            root = root->next;
        }
        root->next = newtree;
    }
    return tree;
}

//清除相邻节点
ANODE clearBrother(ANODE br)
{
    ANODE ptr = br;
    while (br)
    {
        ptr = br;
        br = br->next;
        free(ptr);
    }
    return br;
}


//清除图
GRAPH clearTree(GRAPH root)
{
    GRAPH ptr;
    while (root)
    {
        ptr = root;
        root = root->next;
        if (ptr->node)
        {
            clearBrother(ptr->node->child);
            free(ptr->node);
        }
        free(ptr);
    }
    return NULL;
}

//响铃节点填数据+构成链
ANODE creatBrotherList(ANODE rbrother, char* input)
{
    for (int i = 0; input[i] != '\0'; i++)
    {
        if (input[i] != '/')
        {
            rbrother = appendBrotherNode(rbrother, input[i]);
        }
    }
    return rbrother;
}

//入栈
STACK push(STACK stack, const char name)
{
    STACK newNode = (STACK)malloc(sizeof(STACKNODE));
    newNode->name = name;
    newNode->next = stack;
    return newNode;
}

//出栈
STACK pop(STACK stack, char* name)
{
    if (stack == NULL)
        return NULL;
    STACK temp = stack;
    *name = temp->name;
    stack = stack->next;
    free(temp);
    return stack;
}

//栈空判断
int isEmpty(STACK stack)
{
    return stack == NULL;
}

void printPath(STACK path)//输出路径
{
    if (!path) return;
    printf("%c", path->name);
    path = path->next;
    while (path)
    {
        printf("->%c", path->name);
        path = path->next;
    }

}

//路径栈入栈
PATH pushPath(PATH pathtotal,STACK curpath)
{
    PATH newpathnode = (PATH)malloc(sizeof(PATHNODE));
    newpathnode->TOPPANTH = curpath;
    newpathnode->PATHLINK = pathtotal;
    return newpathnode;
}

//路径栈出栈
PATH popPath(PATH pathtotal,STACK* epositepath)
{
    PATH ptr = pathtotal;
    *epositepath = ptr->TOPPANTH;
    pathtotal = pathtotal->PATHLINK;
    free(ptr);
    return pathtotal;
}

STACK copyPath(STACK copyedpath)
{
    char str[NAMESIZE];
    int cnt = 0;
    STACK ptr = copyedpath;
    while(ptr)//先把节点放在数组里面
    {
        str[cnt] = ptr->name;
        cnt++;
        ptr = ptr->next;
    }
    
    STACK head =(STACK)malloc(sizeof(STACKNODE));
    head->next = NULL;
    head->name = str[0];
    STACK curr = head;
    for(int i = 1;i < cnt;i++)
    {
        STACK newpathnode = (STACK)malloc(sizeof(STACKNODE));
        newpathnode->name = str[i];
        newpathnode->next = NULL;
        curr->next = newpathnode;
        curr = newpathnode;
    }
    return head;
}

//判断相邻节点是否已经搜索过
//1 表示路径构成回路 0表示没构成回路
int isInPath(STACK path, char node)
{
    while (path)
    {
        if (path->name == node) return 1;
        path = path->next;
    }
    return 0;
}


//打印真实路径:
void printFullPath(STACK path)
{
    //栈是头插法，栈顶 最深
    char str[NAMESIZE];
    int cnt = 0;
    STACK ptr = path;
    while (ptr)
    {
        str[cnt++] = ptr->name;
        ptr = ptr->next;
    }
    // 从栈底（根）往栈顶（目标）打印
    for (int i = cnt - 1; i >= 0; i--)
    {
        if (i < cnt - 1) printf("->");
        printf("%c", str[i]);
    }
}

//搜索
void searchInGraph(GRAPH graph,char start, char target)
{
    if (graph == NULL)
        {
            printf("no");
            return ;
        }
    PATH frontier = NULL;
    STACK initPath = NULL;
    initPath = push(initPath,start);
    frontier = pushPath(frontier,initPath);
    while(frontier)
    {
        STACK curpath = NULL;
        frontier = popPath(frontier,&curpath);
        char current = curpath->name;
        GRAPH cur = graph;

        if (current == target)    // 路径末端 == 目标
        {
            printf("yes");
            return;
        }

        while(cur)
        {
            if(cur->node->node == current)
            {
                ANODE neibor = cur->node->child; 
                while(neibor)
                {
                    if(!isInPath(curpath,neibor->node))//没构成回路
                    {
                        STACK newpath = copyPath(curpath);
                        newpath = push(newpath,neibor->node);
                        frontier = pushPath(frontier,newpath);//所有相邻路径入栈
                    }
                    
                    neibor = neibor->next;
                }
                break;    
            }

            cur = cur -> next;
        }
    }
    printf("no");
}


int main()
{
    int n;
    scanf("%d", &n);

    //  建图
    GRAPH tree = NULL;
    for (int i = 0; i < n; i++)
    {
        char parentName;
        char childStr[NAMESIZE];

        scanf(" %c", &parentName);   // 跳过换行
        scanf("%s", childStr);        // 读邻居 ->"B/D/E"

        ANODE br = NULL;
        br = creatBrotherList(br, childStr);

        GRAPH newtree = CreatTree(parentName, br);
        tree = addTree(tree, newtree);
    }
    
    //查找
    char start,end;
    scanf(" %c",&start);
    scanf(" %c",&end);

    searchInGraph(tree,start,end);

    clearTree(tree);
    return 0;
}